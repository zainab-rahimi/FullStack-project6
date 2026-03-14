package com.openclassrooms.backend6.dto.user;

import com.openclassrooms.backend6.dto.topic.TopicResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private List<TopicResponse> subscriptions;
}