package com.openclassrooms.backend6.service;

import com.openclassrooms.backend6.dto.auth.AuthResponse;
import com.openclassrooms.backend6.dto.auth.LoginRequest;
import com.openclassrooms.backend6.dto.auth.RegisterRequest;
import com.openclassrooms.backend6.entity.Role;
import com.openclassrooms.backend6.entity.User;
import com.openclassrooms.backend6.repository.UserRepository;
import com.openclassrooms.backend6.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return AuthResponse.builder().token(token).message("Registration successful").build();
    }
    public AuthResponse login(LoginRequest request) {
        // Resolve user by email or username
        User user = userRepository.findByEmail(request.getIdentifier())
                .or(() -> userRepository.findByUsername(request.getIdentifier()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Manually verify password since we bypassed the AuthenticationManager identifier lookup
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        String token = jwtService.generateToken(user);
        return AuthResponse.builder().token(token).message("Login successful").build();
    }
}
