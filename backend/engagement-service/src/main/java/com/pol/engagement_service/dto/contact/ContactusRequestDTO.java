package com.pol.engagement_service.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactusRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 30, message = "Name can not longer than 30 letters.")
    private String name;

    @NotNull(message = "Phone number is required")
    private Long phoneNumber;

    @Email(message = "Email address is not valid.")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Message is required")
    private String message;
}
