package com.openclassrooms.backend6.dto.article;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ArticleRequest {
    @NotBlank
    private String title;
    @NotBlank private String content;
    @NotNull
    private Long topicId;
}