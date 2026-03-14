package com.openclassrooms.backend6.service;

import com.openclassrooms.backend6.dto.comment.CommentRequest;
import com.openclassrooms.backend6.dto.comment.CommentResponse;
import com.openclassrooms.backend6.entity.Article;
import com.openclassrooms.backend6.entity.Comment;
import com.openclassrooms.backend6.entity.User;
import com.openclassrooms.backend6.exception.ResourceNotFoundException;
import com.openclassrooms.backend6.repository.ArticleRepository;
import com.openclassrooms.backend6.repository.CommentRepository;
import com.openclassrooms.backend6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public CommentResponse addComment(String userEmail, Long articleId, CommentRequest request) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .author(author)
                .article(article)
                .build();

        Comment saved = commentRepository.save(comment);
        return CommentResponse.builder()
                .id(saved.getId())
                .content(saved.getContent())
                .authorUsername(author.getDisplayUsername())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}