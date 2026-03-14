package com.openclassrooms.backend6.controller;

import com.openclassrooms.backend6.dto.comment.CommentRequest;
import com.openclassrooms.backend6.dto.comment.CommentResponse;
import com.openclassrooms.backend6.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/articles/{articleId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> addComment(Authentication auth,
                                                      @PathVariable Long articleId,
                                                      @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(commentService.addComment(auth.getName(), articleId, request));
    }
}