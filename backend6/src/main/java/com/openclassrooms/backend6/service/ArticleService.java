package com.openclassrooms.backend6.service;

import com.openclassrooms.backend6.dto.article.ArticleRequest;
import com.openclassrooms.backend6.dto.article.ArticleResponse;
import com.openclassrooms.backend6.entity.Article;
import com.openclassrooms.backend6.entity.Topic;
import com.openclassrooms.backend6.entity.User;
import com.openclassrooms.backend6.exception.ResourceNotFoundException;
import com.openclassrooms.backend6.dto.comment.CommentResponse;
import com.openclassrooms.backend6.repository.ArticleRepository;
import com.openclassrooms.backend6.repository.CommentRepository;
import com.openclassrooms.backend6.repository.TopicRepository;
import com.openclassrooms.backend6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Transactional(readOnly = true)
    public List<ArticleResponse> getFeed(String userEmail, String sort) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<Topic> subscriptions = user.getSubscriptions();
        if (subscriptions == null || subscriptions.isEmpty()) {
            return Collections.emptyList();
        }

        // Snapshot managed collection before iterating to avoid concurrent modification issues.
        List<Long> topicIds = List.copyOf(subscriptions).stream()
                .map(Topic::getId)
                .toList();

        List<Article> articles = "asc".equalsIgnoreCase(sort)
                ? articleRepository.findByTopicIdsOrderByCreatedAtAsc(topicIds)
                : articleRepository.findByTopicIdsOrderByCreatedAtDesc(topicIds);

        return articles.stream().map(this::toResponse).toList();
    }

    public ArticleResponse createArticle(String userEmail, ArticleRequest request) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));

        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(author)
                .topic(topic)
                .build();

        return toResponse(articleRepository.save(article));
    }

    public ArticleResponse getArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        return toResponse(article);
    }

    private ArticleResponse toResponse(Article article) {
        List<CommentResponse> comments = commentRepository.findByArticleOrderByCreatedAtAsc(article)
                .stream()
                .map(c -> CommentResponse.builder()
                        .id(c.getId())
                        .content(c.getContent())
                        .authorUsername(c.getAuthor().getDisplayUsername())
                        .createdAt(c.getCreatedAt())
                        .build())
                .toList();

        return ArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .authorUsername(article.getAuthor().getDisplayUsername())
                .topicName(article.getTopic().getName())
                .createdAt(article.getCreatedAt())
                .comments(comments)
                .build();
    }
}
