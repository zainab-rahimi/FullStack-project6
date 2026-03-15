package com.openclassrooms.backend6.controller;

import com.openclassrooms.backend6.dto.article.ArticleRequest;
import com.openclassrooms.backend6.dto.article.ArticleResponse;
import com.openclassrooms.backend6.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/feed")
    public ResponseEntity<List<ArticleResponse>> getFeed(Authentication auth,
                                                         @RequestParam(value = "sort", defaultValue = "desc") String sort) {
        return ResponseEntity.ok(articleService.getFeed(auth.getName(), sort));
    }

    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(Authentication auth,
                                                         @Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleService.createArticle(auth.getName(), request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticle(id));
    }
}
