package com.pol.engagement_service.dto.contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactusSummaryDTO {
    private UUID id;
    private String name;
    private String subject;
    private String createdAt;
}
