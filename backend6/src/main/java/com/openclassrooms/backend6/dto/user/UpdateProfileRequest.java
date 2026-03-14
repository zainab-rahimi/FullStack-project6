package com.openclassrooms.backend6.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    // Optional — only update password if provided
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String newPassword;
}
