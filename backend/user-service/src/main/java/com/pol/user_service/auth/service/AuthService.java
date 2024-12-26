package com.pol.user_service.auth.service;

import com.pol.user_service.auth.dto.AuthResponseDTO;
import com.pol.user_service.auth.dto.LoginRequestDTO;
import com.pol.user_service.auth.dto.RegisterRequestDTO;
import com.pol.user_service.auth.model.User;
import com.pol.user_service.auth.model.UserRole;
import com.pol.user_service.auth.repository.UserRepository;
import com.pol.user_service.constants.KafkaTopics;
import com.pol.user_service.exception.customExceptions.DatabaseAccessException;
import com.pol.user_service.exception.customExceptions.UserAlreadyExists;
import com.pol.user_service.schema.avro.UserRegisteredEvent;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtService jwtService;
    private final UserRoleService userRoleService;
    private final RefreshTokenService refreshTokenService;
    private final GenerateCookies generateCookies;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO,HttpServletResponse response) {
        // Check for duplicate email
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new UserAlreadyExists(
                    "User with email id " + registerRequestDTO.getEmail() + " already exists"
            );
        }

        // Check for duplicate username
        if (userRepository.existsByUsername(registerRequestDTO.getUsername())) {
            throw new UserAlreadyExists(
                    "User with username " + registerRequestDTO.getUsername() + " already exists"
            );
        }

        // Retrieve default user role
        UserRole defaultRole = userRoleService.getDefaultRoleUser();

        // Create a new user
        var user = User.builder()
                .firstName(registerRequestDTO.getFirstName())
                .lastName(registerRequestDTO.getLastName())
                .email(registerRequestDTO.getEmail())
                .username(registerRequestDTO.getUsername())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .roles(Collections.singleton(defaultRole))
                .build();

        try {
            // Save user to database
            User savedUser = userRepository.save(user);

            // Publish user registration event to Kafka
            UserRegisteredEvent newUserRegisteredEvent = new UserRegisteredEvent();
            newUserRegisteredEvent.setEmail(savedUser.getEmail());
            newUserRegisteredEvent.setName(savedUser.getUsername());

            try {
                kafkaTemplate.send(KafkaTopics.UserRegisteredTopic, newUserRegisteredEvent);
            } catch (Exception kafkaException) {
                logger.error("Failed to publish user registration event to Kafka", kafkaException);
            }

            // Generate tokens
            var accessToken = jwtService.generateToken(savedUser);
            var refreshToken = refreshTokenService.createRefreshToken(savedUser.getEmail());

            generateCookies.addRefreshTokenToCookie(response,refreshToken.getRefreshToken());
            Set<UserRole> roles = user.getRoles();
            String roleName = roles.iterator().next().getRoleName();

            return AuthResponseDTO.builder()
                    .accessToken(accessToken)
                    .role(roleName)
                    .username(user.getActualUsername())
                    .build();
        } catch (DataIntegrityViolationException e) {
            logger.error("User registration failed: Duplicate email or username detected", e);
            throw new UserAlreadyExists("A user with this email or username already exists.");
        } catch (ConstraintViolationException e) {
            logger.error("User registration failed: Validation constraint violation", e);
            throw new RuntimeException("User data is invalid. Please check the provided information.");
        } catch (DataAccessException e) {
            logger.error("User registration failed: Database access error", e);
            throw new DatabaseAccessException("Unable to save user due to a database error.");
        }
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO,HttpServletResponse response){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginRequestDTO
                        .getEmail())
                .orElseThrow(()->
                        new UsernameNotFoundException("User not found with email : " + loginRequestDTO.getEmail()));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginRequestDTO.getEmail());

        generateCookies.addRefreshTokenToCookie(response,refreshToken.getRefreshToken());
        Set<UserRole> roles = user.getRoles();
        String roleName = roles.iterator().next().getRoleName();

        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .role(roleName)
                .username(user.getActualUsername())
                .build();
    }
}
