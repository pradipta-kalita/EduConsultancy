package com.pol.engagement_service.controller;

import com.pol.engagement_service.dto.feedback.FeedbackRequestDTO;
import com.pol.engagement_service.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public void createFeedback(@Valid @RequestBody FeedbackRequestDTO feedbackRequestDTO){
        feedbackService.createFeedback(feedbackRequestDTO);
    }
}
