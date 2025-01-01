package com.pol.product_service.DTO.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class CourseSummaryDTO {
    private UUID id;
    private String title;
    private String summary;
    private BigDecimal price;
    private String instructor;
    private String imageUrl;
}
