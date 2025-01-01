package com.pol.blog_service.dto.blog;

import com.pol.blog_service.dto.tags.TagSummaryDTO;
import com.pol.blog_service.entity.BlogStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogResponseDTO {
    private UUID id;
    private String title;
    private String content;
    private String publishedAt;
    private String author;
    private UUID authorId;
    private BlogStatus status;
    private String imageUrl;
    @Builder.Default
    private Set<TagSummaryDTO> tags= new HashSet<>();
}
