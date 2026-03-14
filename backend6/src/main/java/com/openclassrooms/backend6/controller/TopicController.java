package com.openclassrooms.backend6.controller;

import com.openclassrooms.backend6.dto.topic.TopicRequest;
import com.openclassrooms.backend6.dto.topic.TopicResponse;
import com.openclassrooms.backend6.service.TopicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllTopics(Authentication auth) {
        return ResponseEntity.ok(topicService.getAllTopics(auth.getName()));
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<TopicResponse> getTopicById(Authentication auth, @PathVariable Long topicId) {
        return ResponseEntity.ok(topicService.getTopicById(auth.getName(), topicId));
    }

    @PostMapping
    public ResponseEntity<TopicResponse> createTopic(@Valid @RequestBody TopicRequest topicRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(topicService.createTopic(topicRequest));
    }

    @PutMapping("/{topicId}")
    public ResponseEntity<TopicResponse> updateTopic(@PathVariable Long topicId, @Valid @RequestBody TopicRequest topicRequest) {
        return ResponseEntity.ok(topicService.updateTopic(topicId, topicRequest));
    }

    @DeleteMapping("/{topicId}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long topicId) {
        topicService.deleteTopic(topicId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{topicId}/subscribe")
    public ResponseEntity<Void> subscribe(Authentication auth, @PathVariable Long topicId) {
        topicService.subscribe(auth.getName(), topicId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{topicId}/subscribe")
    public ResponseEntity<Void> unsubscribe(Authentication auth, @PathVariable Long topicId) {
        topicService.unsubscribe(auth.getName(), topicId);
        return ResponseEntity.ok().build();
    }
}