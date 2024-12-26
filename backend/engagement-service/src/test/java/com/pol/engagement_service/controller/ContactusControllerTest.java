package com.pol.engagement_service.controller;

import com.pol.engagement_service.dto.contact.ContactusRequestDTO;
import com.pol.engagement_service.service.ContactusService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

class ContactusControllerTest {

    @InjectMocks
    private ContactusController contactusController;

    @Mock
    private ContactusService contactusService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createContactUs_ShouldCallServiceMethod() {
        // Arrange
        ContactusRequestDTO contactusRequestDTO = ContactusRequestDTO.builder()
                .email("polkalita@gmail.com")
                .name("pol kalita")
                .message("Your website is awesome")
                .phoneNumber(1122334455L)
                .subject("READ IT")
                .build();

        // Act
        contactusController.createContactUs(contactusRequestDTO);

        // Assert
        // Verify that the service method was called exactly once
        verify(contactusService, times(1)).createContactUs(contactusRequestDTO);
    }
}
