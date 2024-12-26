package com.pol.engagement_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pol.engagement_service.dto.feedback.FeedbackRequestDTO;
import com.pol.engagement_service.service.FeedbackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class FeedbackControllerTest {

    @InjectMocks
    private FeedbackController feedbackController;

    @Mock
    private FeedbackService feedbackService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(feedbackController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createFeedback_ShouldReturnStatusOk_WhenRequestIsValid() throws Exception {
        // Arrange
        FeedbackRequestDTO feedbackRequestDTO =FeedbackRequestDTO.builder()
                .email("polkalita@gmail.com")
                .feedback("Your website really helped me")
                .name("pradipta kalita")
                .rating(5)
                .build();;

        // Act & Assert
        mockMvc.perform(post("/feedbacks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(feedbackRequestDTO)))
                .andExpect(status().isOk()); // Expect HTTP 200 OK

        // Verify that the service method was called once
        verify(feedbackService, times(1)).createFeedback(feedbackRequestDTO);
    }

    @Test
    void createFeedback_ShouldCallServiceSuccessfully() {
        // Arrange
        FeedbackRequestDTO feedbackRequestDTO = FeedbackRequestDTO.builder()
                .email("polkalita@gmail.com")
                .feedback("Your website really helped me")
                .name("pradipta kalita")
                .rating(5)
                .build();

        // Act
        feedbackController.createFeedback(feedbackRequestDTO);

        // Assert
        // Verify that the service method was called exactly once
        verify(feedbackService, times(1)).createFeedback(feedbackRequestDTO);
    }
}
