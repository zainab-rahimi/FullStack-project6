package com.openclassrooms.backend6.dto.topic;

import lombok.Builder;
import lombok.Data;

// dto/topic/TopicResponse.java
@Data
@Builder
public class TopicResponse {
    private Long id;
    private String name;
    private String description;
    private boolean subscribed; // true if the current user is subscribed
}