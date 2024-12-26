package com.pol.engagement_service.mapper;

import com.pol.engagement_service.dto.feedback.FeedbackRequestDTO;
import com.pol.engagement_service.dto.feedback.FeedbackResponseDTO;
import com.pol.engagement_service.entity.Feedback;

public class FeedbackMapper {
    public static Feedback toEntity(FeedbackRequestDTO feedbackRequestDTO){
        Feedback feedback = new Feedback();
        feedback.setFeedback(feedbackRequestDTO.getFeedback());
        feedback.setName(feedbackRequestDTO.getName());
        feedback.setEmail(feedbackRequestDTO.getEmail());
        feedback.setRating(feedbackRequestDTO.getRating());
        return feedback;
    }

    public static FeedbackResponseDTO toResponseDTO(Feedback feedback){
        FeedbackResponseDTO feedbackResponseDTO = new FeedbackResponseDTO();
        feedbackResponseDTO.setId(feedback.getId());
        feedbackResponseDTO.setName(feedback.getName());
        feedbackResponseDTO.setEmail(feedback.getEmail());
        feedbackResponseDTO.setFeedback(feedback.getFeedback());
        feedbackResponseDTO.setRating(feedback.getRating());
        feedbackResponseDTO.setCreatedAt(feedback.getCreatedAt().toString());
        return feedbackResponseDTO;
    }
}
