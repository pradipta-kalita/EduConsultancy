package com.pol.engagement_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pol.engagement_service.dto.contact.ContactPageResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackPageResponseDTO;
import com.pol.engagement_service.dto.feedback.FeedbackResponseDTO;
import com.pol.engagement_service.service.ContactusService;
import com.pol.engagement_service.service.FeedbackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AdminControllerTest {

    @InjectMocks
    private AdminController adminController;

    @Mock
    private FeedbackService feedbackService;

    @Mock
    private ContactusService contactusService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void getAllFeedbacks_ShouldReturnFeedbackPageResponse() throws Exception {
        // Arrange
        FeedbackPageResponseDTO feedbackPageResponse = new FeedbackPageResponseDTO();
        when(feedbackService.getAllFeedbacks(0, 10, "id", "asc")).thenReturn(feedbackPageResponse);

        // Act & Assert
        mockMvc.perform(get("/admin/feedbacks")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "id")
                        .param("order", "asc"))
                .andExpect(status().isOk());

        verify(feedbackService, times(1)).getAllFeedbacks(0, 10, "id", "asc");
    }

    @Test
    void getFeedbackById_ShouldReturnFeedbackResponse() throws Exception {
        // Arrange
        UUID feedbackId = UUID.randomUUID();
        FeedbackResponseDTO feedbackResponse = new FeedbackResponseDTO();
        when(feedbackService.getFeedbackById(feedbackId)).thenReturn(feedbackResponse);

        // Act & Assert
        mockMvc.perform(get("/admin/feedbacks/" + feedbackId))
                .andExpect(status().isOk());

        verify(feedbackService, times(1)).getFeedbackById(feedbackId);
    }

    @Test
    void deleteFeedbackById_ShouldDeleteFeedback() throws Exception {
        // Arrange
        UUID feedbackId = UUID.randomUUID();

        // Act & Assert
        mockMvc.perform(delete("/admin/feedbacks/" + feedbackId))
                .andExpect(status().isOk());

        verify(feedbackService, times(1)).deleteFeedback(feedbackId);
    }

    @Test
    void getAllContactUs_ShouldReturnContactPageResponse() throws Exception {
        // Arrange
        ContactPageResponseDTO contactPageResponse = new ContactPageResponseDTO();
        when(contactusService.getAllContactus(0, 10, "id", "asc")).thenReturn(contactPageResponse);

        // Act & Assert
        mockMvc.perform(get("/admin/contactus")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "id")
                        .param("order", "asc"))
                .andExpect(status().isOk());

        verify(contactusService, times(1)).getAllContactus(0, 10, "id", "asc");
    }

    @Test
    void getContactUsById_ShouldReturnContactResponse() throws Exception {
        // Arrange
        UUID contactId = UUID.randomUUID();
        ContactusResponseDTO contactResponse = new ContactusResponseDTO();
        when(contactusService.getContactUsById(contactId)).thenReturn(contactResponse);

        // Act & Assert
        mockMvc.perform(get("/admin/contactus/" + contactId))
                .andExpect(status().isOk());

        verify(contactusService, times(1)).getContactUsById(contactId);
    }

    @Test
    void deleteContactUsById_ShouldDeleteContactUs() throws Exception {
        // Arrange
        UUID contactId = UUID.randomUUID();

        // Act & Assert
        mockMvc.perform(delete("/admin/contactus/" + contactId))
                .andExpect(status().isOk());

        verify(contactusService, times(1)).deleteContactUsById(contactId);
    }
}
