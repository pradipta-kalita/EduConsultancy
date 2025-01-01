package com.pol.product_service.DTO.course;

import com.pol.product_service.DTO.category.CategoryResponseDTO;
import com.pol.product_service.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private String summary;
    private BigDecimal price;
    private CategoryResponseDTO category;
    private String instructor;
    private UUID instructorId;
    private String imageUrl;
}
