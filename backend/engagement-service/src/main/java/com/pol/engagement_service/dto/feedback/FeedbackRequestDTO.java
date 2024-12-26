package com.pol.engagement_service.dto.feedback;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequestDTO {
    @NotBlank(message = "Your name is required.")
    @Size(max = 50, message = "Your name cannot be longer than 50 letters.")
    private String name;

    @Email(message = "Email address is not valid.")
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Feedback is required")
    private String feedback;

    @Min(value = 1, message = "Rating must be at least 1.")
    @Max(value = 5, message = "Rating must not exceed 5.")
    @NotNull(message = "Rating is required.")
    private Integer rating;
}
