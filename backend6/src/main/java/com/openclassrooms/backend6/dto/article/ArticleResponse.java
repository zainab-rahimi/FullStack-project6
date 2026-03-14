package com.openclassrooms.backend6.dto.article;

import com.openclassrooms.backend6.dto.comment.CommentResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ArticleResponse {
    private Long id;
    private String title;
    private String content;
    private String authorUsername;
    private String topicName;
    private LocalDateTime createdAt;
    private List<CommentResponse> comments;
}