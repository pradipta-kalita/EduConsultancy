//package com.pol.user_service.service;
//
//import com.pol.user_service.auth.dto.AuthResponseDTO;
//import com.pol.user_service.auth.dto.RegisterRequestDTO;
//import com.pol.user_service.auth.model.RefreshToken;
//import com.pol.user_service.auth.model.User;
//import com.pol.user_service.auth.model.UserRole;
//import com.pol.user_service.auth.model.UserRoleEnum;
//import com.pol.user_service.auth.repository.UserRepository;
//import com.pol.user_service.auth.service.*;
//
//
//import jakarta.servlet.http.HttpServletResponse;
//import org.apache.kafka.clients.producer.KafkaProducer;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//import static org.mockito.Mockito.*;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.time.Instant;
//import java.util.Collections;
//import java.util.Set;
//import java.util.UUID;
//
//
//@SpringBootTest
//class AuthServiceTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private RefreshToken refreshToken;
//
//    @InjectMocks
//    private RefreshTokenService refreshTokenService;
//
//    @Mock
//    private JwtService jwtService;
//
//    @Mock
//    private KafkaProducer kafkaProducer;
//
//    @InjectMocks
//    private AuthService authService;
//
//    @Mock
//    private KafkaTemplate<String,Object> kafkaTemplate;
//
//    @InjectMocks
//    private UserRoleService userRoleService;
//
//    @Mock
//    private GenerateCookies generateCookies;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    private User mockUser;
//    private AuthResponseDTO authResponseDTO;
//    private UserRole userRole;
//    private RefreshToken mockRefreshToken;
//
//    @BeforeEach
//    void setUp() {
//        userRole = UserRole.builder()
//                .id(UUID.randomUUID())
//                .roleName(UserRoleEnum.STUDENT.toString())
//                .build();
//
//        mockUser = User.builder()
//                .firstName("John")
//                .lastName("Doe")
//                .username("johndoe")
//                .email("johndoe@example.com")
//                .roles(Collections.singleton(userRole))
//                .password(passwordEncoder.encode("12345678"))
//                .build();
//
//        mockRefreshToken = RefreshToken.builder()
//                .id(UUID.randomUUID())
//                .refreshToken(UUID.randomUUID().toString())
//                .expirationTime(Instant.now().plusMillis(3600000))
//                .user(mockUser)
//                .build();
//
//        authResponseDTO = AuthResponseDTO.builder()
//                .accessToken("jwt-access-token")
//                .username("johndoe")
//                .role("STUDENT")
//                .build();
//    }
//
//    @DisplayName("")
//    @Test
//    public void givenRegisterRequestDTO_whenRegister_thenReturnAuthResponseDTO() {
//        // given - precondition or setup
//        BDDMockito.given(userRepository.existsByEmail(mockUser.getEmail())).willReturn(false);
//        BDDMockito.given(userRepository.existsByUsername(mockUser.getActualUsername())).willReturn(false);
//        BDDMockito.given(userRepository.save(any(User.class))).willReturn(mockUser);
//        BDDMockito.given(userRoleService.getDefaultRoleUser()).willReturn(userRole);
//
//        String mockAccessToken = "mock-access-token";
//        RegisterRequestDTO mockRegisterRequestDTO = RegisterRequestDTO.builder()
//                .email(mockUser.getEmail())
//                .firstName(mockUser.getFirstName())
//                .lastName(mockUser.getLastName())
//                .password("12345678")
//                .username(mockUser.getActualUsername())
//                .build();
//        BDDMockito.given(jwtService.generateToken(mockUser)).willReturn(mockAccessToken);
//        BDDMockito.given(refreshTokenService.createRefreshToken(mockUser.getEmail())).willReturn(mockRefreshToken);
//
//        // Mock the response object for adding the refresh token to cookies
//        HttpServletResponse mockResponse = Mockito.mock(HttpServletResponse.class);
//
//        // when - action or behavior we are going to test
//        AuthResponseDTO authResponseDTO = authService.register(mockRegisterRequestDTO, mockResponse);
//
//        // then - verify the output
//        Assertions.assertNotNull(authResponseDTO);
//        Assertions.assertEquals(mockAccessToken, authResponseDTO.getAccessToken());
//        Assertions.assertEquals(mockUser.getUsername(), authResponseDTO.getUsername());
//        Assertions.assertEquals(userRole.getRoleName(), authResponseDTO.getRole());
//
//        // Verify that the refresh token was added to the cookies in the response
//        Mockito.verify(generateCookies).addRefreshTokenToCookie(mockResponse, mockRefreshToken.getRefreshToken());
//
//        // Verify the user was saved
//        Mockito.verify(userRepository).save(any(User.class));
//
//    }
//
//
//
//}
