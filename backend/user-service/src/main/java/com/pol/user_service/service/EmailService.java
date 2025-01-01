package com.pol.user_service.service;

import com.pol.user_service.auth.dto.AuthResponseDTO;
import com.pol.user_service.auth.dto.EmailRequestDTO;
import com.pol.user_service.auth.dto.VerifyOtpDTO;
import com.pol.user_service.auth.model.ForgotPassword;
import com.pol.user_service.auth.model.User;
import com.pol.user_service.auth.model.UserRole;
import com.pol.user_service.auth.repository.ForgotPasswordRepository;
import com.pol.user_service.auth.repository.UserRepository;
import com.pol.user_service.auth.service.GenerateCookies;
import com.pol.user_service.auth.service.JwtService;
import com.pol.user_service.auth.service.RefreshTokenService;
import com.pol.user_service.constants.KafkaTopics;
import com.pol.user_service.exception.customExceptions.InvalidOTPException;
import com.pol.user_service.exception.customExceptions.OTPExpiredException;
import com.pol.user_service.exception.customExceptions.TooManyAttemptsException;
import com.pol.user_service.exception.customExceptions.UserNotFoundException;
import com.pol.user_service.schema.avro.ForgotPasswordEvent;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final UserRepository userRepository;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final GenerateCookies generateCookies;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final KafkaTemplate<String,Object> kafkaTemplate;

    @Value("${jwt.forgot-expiration}")
    private long forgotPasswordExpiration;


    public String verifyEmailAndSendOTP(EmailRequestDTO emailRequestDTO) {
        User user = userRepository.findByEmail(emailRequestDTO.getEmail()).orElseThrow(()->
                new UserNotFoundException("User not found with email address : "+
                        emailRequestDTO.getEmail()));

        Integer otp = otpGenerator();
        ForgotPassword forgotPasswordObj = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date((System.currentTimeMillis()+forgotPasswordExpiration)))
                .user(user)
                .build();
        forgotPasswordRepository.save(forgotPasswordObj);

        ForgotPasswordEvent newForgotPasswordEvent = new ForgotPasswordEvent();
        newForgotPasswordEvent.setEmail(user.getEmail());
        newForgotPasswordEvent.setOtp(otp.toString());
        newForgotPasswordEvent.setName(user.getFirstName()+" "+user.getLastName());
        try {
            kafkaTemplate.send(KafkaTopics.ForgotPasswordTopic, newForgotPasswordEvent);
        } catch (Exception kafkaException) {
            logger.error("Failed to publish forgot password event to Kafka", kafkaException);
        }
        return "Email sent for verification";
    }


    @Transactional
    public AuthResponseDTO verifyOTP(VerifyOtpDTO verifyOtpDTO,HttpServletResponse response) {
        User user = userRepository.findByEmail(verifyOtpDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email address: " + verifyOtpDTO.getEmail()));

        ForgotPassword forgotPasswordObj = user.getForgotPassword();
        if (forgotPasswordObj == null) {
            throw new InvalidOTPException("The provided OTP or email is incorrect or you haven't requested for an OTP yet. Please check your details and try again.");
        }

        if (forgotPasswordObj.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(forgotPasswordObj.getId());
            throw new OTPExpiredException("OTP has expired. Please request a new one.");
        }

        if (forgotPasswordObj.getAttempts() >= 3) {
            System.out.println("Too Many Attempts. Current Attempts: " + forgotPasswordObj.getAttempts());
            forgotPasswordRepository.deleteById(forgotPasswordObj.getId());
            throw new TooManyAttemptsException("Too many attempts. Please request a new OTP.");
        }

        if (!forgotPasswordObj.getOtp().equals(verifyOtpDTO.getOtp())) {
            forgotPasswordObj.setAttempts(forgotPasswordObj.getAttempts() + 1);
            forgotPasswordRepository.save(forgotPasswordObj);
            throw new InvalidOTPException("Invalid OTP for email: " + verifyOtpDTO.getEmail());
        }

        user.setForgotPassword(null);
        userRepository.save(user);

        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());

        generateCookies.addRefreshTokenToCookie(response,refreshToken.getRefreshToken());
        Set<UserRole> roles = user.getRoles();
        String roleName = roles.iterator().next().getRoleName();

        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .role(roleName)
                .username(user.getActualUsername())
                .build();
    }


    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000,999_999);
    }
}
