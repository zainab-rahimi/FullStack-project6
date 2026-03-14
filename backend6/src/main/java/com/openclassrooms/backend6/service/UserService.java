package com.openclassrooms.backend6.service;

import com.openclassrooms.backend6.dto.topic.TopicResponse;
import com.openclassrooms.backend6.dto.user.UpdateProfileRequest;
import com.openclassrooms.backend6.dto.user.UserProfileResponse;
import com.openclassrooms.backend6.entity.User;
import com.openclassrooms.backend6.exception.ResourceNotFoundException;
import com.openclassrooms.backend6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<TopicResponse> subs = user.getSubscriptions().stream()
                .map(t -> TopicResponse.builder()
                        .id(t.getId())
                        .name(t.getName())
                        .description(t.getDescription())
                        .subscribed(true)
                        .build())
                .toList();

        return UserProfileResponse.builder()
                .id(user.getId())
                .username(user.getDisplayUsername())
                .email(user.getEmail())
                .subscriptions(subs)
                .build();
    }

    public UserProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepository.save(user);
        return getProfile(request.getEmail());
    }
}