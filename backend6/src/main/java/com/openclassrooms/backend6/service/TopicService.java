package com.openclassrooms.backend6.service;

import com.openclassrooms.backend6.dto.topic.TopicRequest;
import com.openclassrooms.backend6.dto.topic.TopicResponse;
import com.openclassrooms.backend6.entity.Topic;
import com.openclassrooms.backend6.entity.User;
import com.openclassrooms.backend6.exception.ResourceNotFoundException;
import com.openclassrooms.backend6.repository.TopicRepository;
import com.openclassrooms.backend6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return topicRepository.findAll().stream()
                .map(topic -> TopicResponse.builder()
                        .id(topic.getId())
                        .name(topic.getName())
                        .description(topic.getDescription())
                        .subscribed(user.getSubscriptions().contains(topic))
                        .build())
                .toList();
    }

    @Transactional
    public void subscribe(String userEmail, Long topicId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));

        user.getSubscriptions().add(topic);
        userRepository.save(user);
    }

    @Transactional
    public void unsubscribe(String userEmail, Long topicId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));

        user.getSubscriptions().remove(topic);
        userRepository.save(user);
    }

    public TopicResponse createTopic(TopicRequest topicRequest) {
        Topic topic = Topic.builder()
                .name(topicRequest.getName())
                .description(topicRequest.getDescription())
                .build();
        Topic savedTopic = topicRepository.save(topic);
        return TopicResponse.builder()
                .id(savedTopic.getId())
                .name(savedTopic.getName())
                .description(savedTopic.getDescription())
                .subscribed(false)
                .build();
    }

    public TopicResponse updateTopic(Long topicId, TopicRequest topicRequest) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
        topic.setName(topicRequest.getName());
        topic.setDescription(topicRequest.getDescription());
        Topic updatedTopic = topicRepository.save(topic);
        return TopicResponse.builder()
                .id(updatedTopic.getId())
                .name(updatedTopic.getName())
                .description(updatedTopic.getDescription())
                .subscribed(false)
                .build();
    }

    public void deleteTopic(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
        topicRepository.delete(topic);
    }

    @Transactional(readOnly = true)
    public TopicResponse getTopicById(String userEmail, Long topicId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
        return TopicResponse.builder()
                .id(topic.getId())
                .name(topic.getName())
                .description(topic.getDescription())
                .subscribed(user.getSubscriptions().contains(topic))
                .build();
    }
}