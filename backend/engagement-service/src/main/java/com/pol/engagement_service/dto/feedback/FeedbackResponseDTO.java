package com.pol.engagement_service.dto.feedback;

import lombok.Data;

import java.util.UUID;

@Data
public class FeedbackResponseDTO {
    private UUID id;
    private String name;
    private int rating;
    private String email;
    private String feedback;
    private String createdAt;
}
