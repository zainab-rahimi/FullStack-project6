package com.openclassrooms.backend6.dto.auth;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String identifier; // accepts email OR username
    @NotBlank
    private String password;
}