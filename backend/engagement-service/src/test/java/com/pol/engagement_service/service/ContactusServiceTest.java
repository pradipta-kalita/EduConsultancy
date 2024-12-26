package com.pol.engagement_service.service;

import com.pol.engagement_service.dto.contact.ContactPageResponseDTO;
import com.pol.engagement_service.dto.contact.ContactusRequestDTO;
import com.pol.engagement_service.dto.contact.ContactusResponseDTO;
import com.pol.engagement_service.entity.ContactUs;
import com.pol.engagement_service.repository.ContactusRepository;
import com.pol.engagement_service.mapper.ContactusMapper;
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

class ContactusServiceTest {

    @Mock
    private ContactusRepository contactusRepository;

    @InjectMocks
    private ContactusService contactusService;

    private ContactUs contactUs;
    private ContactusRequestDTO contactusRequestDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Set up a test ContactUs entity
        contactUs = new ContactUs(UUID.randomUUID(), "John Doe", 1234567890L, "john@example.com", "Test Subject", "Test message", LocalDateTime.now());

        // Set up a test ContactusRequestDTO
        contactusRequestDTO = new ContactusRequestDTO();
        contactusRequestDTO.setName("John Doe");
        contactusRequestDTO.setPhoneNumber(1234567890L);
        contactusRequestDTO.setEmail("john@example.com");
        contactusRequestDTO.setSubject("Test Subject");
        contactusRequestDTO.setMessage("Test message");
    }

    @Test
    void testCreateContactUs() {
        // Arrange
        when(contactusRepository.save(any(ContactUs.class))).thenReturn(contactUs);

        // Act
        contactusService.createContactUs(contactusRequestDTO);

        // Assert
        verify(contactusRepository, times(1)).save(any(ContactUs.class));
    }

    @Test
    void testGetContactUsByIdSuccess() {
        // Arrange
        UUID contactUsId = contactUs.getId();
        when(contactusRepository.findById(contactUsId)).thenReturn(Optional.of(contactUs));

        // Act
        ContactusResponseDTO result = contactusService.getContactUsById(contactUsId);

        // Assert
        assertNotNull(result);
        assertEquals(contactUs.getId(), result.getId());
        assertEquals(contactUs.getName(), result.getName());
    }

    @Test
    void testGetContactUsByIdNotFound() {
        // Arrange
        UUID contactUsId = UUID.randomUUID();
        when(contactusRepository.findById(contactUsId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> contactusService.getContactUsById(contactUsId));
    }

    @Test
    void testDeleteContactUsByIdSuccess() {
        // Arrange
        UUID contactUsId = contactUs.getId();
        when(contactusRepository.existsById(contactUsId)).thenReturn(true);

        // Act
        contactusService.deleteContactUsById(contactUsId);

        // Assert
        verify(contactusRepository, times(1)).deleteById(contactUsId);
    }

    @Test
    void testDeleteContactUsByIdNotFound() {
        // Arrange
        UUID contactUsId = UUID.randomUUID();
        when(contactusRepository.existsById(contactUsId)).thenReturn(false);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> contactusService.deleteContactUsById(contactUsId));
    }

//    @Test
//    void testGetAllContactus() {
//        // Arrange
//        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Order.asc("name")));
//        Page<ContactUs> contactUsPage = new PageImpl<>(List.of(contactUs), pageRequest, 1);
//        when(contactusRepository.findAll(pageRequest)).thenReturn(contactUsPage);
//
//        // Act
//        ContactPageResponseDTO result = contactusService.getAllContactus(0, 10, "name", "asc");
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(1, result.getTotalElements());
//        assertEquals(1, result.getTotalPages());
//        assertFalse(result.getList().isEmpty());
//    }
}
