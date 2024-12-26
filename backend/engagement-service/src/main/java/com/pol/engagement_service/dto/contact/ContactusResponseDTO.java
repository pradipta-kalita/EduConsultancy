package com.pol.engagement_service.dto.contact;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ContactusResponseDTO {
    private UUID id;
    private String name;
    private Long phoneNumber;
    private String email;
    private String subject;
    private String message;
}
