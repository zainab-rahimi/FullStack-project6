package com.openclassrooms.backend6.dto.topic;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
// dto/topic/TopicRequest.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicRequest {
    @NotBlank(message = "Topic name is required")
    @Size(min = 1, max = 100, message = "Topic name must be between 1 and 100 characters")
    private String name;
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}
