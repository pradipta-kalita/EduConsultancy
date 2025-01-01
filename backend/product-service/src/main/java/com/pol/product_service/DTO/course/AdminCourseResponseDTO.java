package com.pol.product_service.DTO.course;

import com.pol.product_service.DTO.category.CategoryResponseDTO;
import com.pol.product_service.entity.CourseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCourseResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private String summary;
    private BigDecimal price;
    private CategoryResponseDTO category;
    private CourseStatus status;
    private String imageUrl;
}
