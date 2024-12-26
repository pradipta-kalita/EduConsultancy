package com.pol.blog_service.dto.tags;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagRequestDTO {
    @NotBlank(message = "Please provide a tag name")
    private String tagname;
}
