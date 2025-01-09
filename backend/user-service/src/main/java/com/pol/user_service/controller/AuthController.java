package com.pol.user_service.controller;

import com.pol.user_service.auth.dto.AuthResponseDTO;
import com.pol.user_service.auth.dto.LoginRequestDTO;
import com.pol.user_service.auth.dto.RegisterRequestDTO;
import com.pol.user_service.auth.model.RefreshToken;
import com.pol.user_service.auth.model.User;
import com.pol.user_service.auth.model.UserRole;
import com.pol.user_service.auth.service.AuthService;
import com.pol.user_service.auth.service.GenerateCookies;
import com.pol.user_service.auth.service.JwtService;
import com.pol.user_service.auth.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final GenerateCookies generateCookies;

    public AuthController(AuthService authService, RefreshTokenService refreshTokenService, JwtService jwtService, GenerateCookies generateCookies) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.generateCookies = generateCookies;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO,
                                                    HttpServletResponse response
                                                   ){
        return ResponseEntity.ok(authService.register(registerRequestDTO,response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO,
                                                 HttpServletResponse response
                                                 ){
        return ResponseEntity.ok(authService.login(loginRequestDTO,response));
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refreshToken(HttpServletRequest request,
                                                        HttpServletResponse response){
        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(request);
        User user = refreshToken.getUser();

        String accessToken = jwtService.generateToken(user);
        generateCookies.addRefreshTokenToCookie(response,refreshToken.getRefreshToken());
        Set<UserRole> roles = user.getRoles();
        String roleName = roles.iterator().next().getRoleName();
        return ResponseEntity.ok(AuthResponseDTO.builder()
                .accessToken(accessToken)
                .role(roleName)
                .username(user.getActualUsername())
                .build());

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout successful");
    }
}

