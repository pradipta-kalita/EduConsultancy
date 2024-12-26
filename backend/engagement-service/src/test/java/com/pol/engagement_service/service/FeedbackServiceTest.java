package com.pol.engagement_service.service;

import com.pol.engagement_service.dto.feedback.FeedbackPageResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackRequestDTO;
import com.pol.engagement_service.dto.feedback.FeedbackResponseDTO;
import com.pol.engagement_service.entity.Feedback;
import com.pol.engagement_service.mapper.FeedbackMapper;
import com.pol.engagement_service.repository.FeedbackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    private Feedback feedback;
    private FeedbackRequestDTO feedbackRequestDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Set up a test Feedback entity
        feedback = Feedback.builder()
                .id(UUID.randomUUID())
                .name("pol kalita")
                .email("polkalita@gmail.com")
                .feedback("great website")
                .summary("great website")
                .rating(5)
                .createdAt(LocalDateTime.now())
                .build();

        // Set up a test FeedbackRequestDTO
        feedbackRequestDTO = new FeedbackRequestDTO();
        feedbackRequestDTO.setName("John Doe");
        feedbackRequestDTO.setEmail("john@example.com");
        feedbackRequestDTO.setFeedback("Great service!");
    }

    @Test
    void testCreateFeedback() {
        // Arrange
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        // Act
        feedbackService.createFeedback(feedbackRequestDTO);

        // Assert
        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }

    @Test
    void testDeleteFeedbackSuccess() {
        // Arrange
        UUID feedbackId = feedback.getId();
        when(feedbackRepository.existsById(feedbackId)).thenReturn(true);

        // Act
        feedbackService.deleteFeedback(feedbackId);

        // Assert
        verify(feedbackRepository, times(1)).deleteById(feedbackId);
    }

    @Test
    void testDeleteFeedbackNotFound() {
        // Arrange
        UUID feedbackId = UUID.randomUUID();
        when(feedbackRepository.existsById(feedbackId)).thenReturn(false);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> feedbackService.deleteFeedback(feedbackId));
    }

    @Test
    void testGetFeedbackByIdSuccess() {
        // Arrange
        UUID feedbackId = feedback.getId();
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(feedback));

        // Act
        FeedbackResponseDTO result = feedbackService.getFeedbackById(feedbackId);

        // Assert
        assertNotNull(result);
        assertEquals(feedback.getId(), result.getId());
        assertEquals(feedback.getName(), result.getName());
    }

    @Test
    void testGetFeedbackByIdNotFound() {
        // Arrange
        UUID feedbackId = UUID.randomUUID();
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> feedbackService.getFeedbackById(feedbackId));
    }

//    @Test
//    void testGetAllFeedbacks() {
//        // Arrange
//        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Order.asc("name")));
//        Page<Feedback> feedbackPage = new PageImpl<>(List.of(feedback), pageRequest, 1);
//        when(feedbackRepository.findAll(pageRequest)).thenReturn(feedbackPage);
//
//        // Act
//        FeedbackPageResponseDTO result = feedbackService.getAllFeedbacks(0, 10, "name", "asc");
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(1, result.getTotalElements());
//        assertEquals(1, result.getTotalPages());
//        assertFalse(result.getList().isEmpty());
//    }
}
