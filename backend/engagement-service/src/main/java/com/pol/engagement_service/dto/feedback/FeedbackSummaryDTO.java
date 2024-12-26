package com.pol.engagement_service.dto.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackSummaryDTO {
    private UUID id;
    private String name;
    private int rating;
    private String email;
    private String summary;
    private String createdAt;
}
