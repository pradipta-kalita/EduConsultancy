package com.pol.blog_service.controller;

import com.pol.blog_service.dto.tags.TagPageResponseDTO;
import com.pol.blog_service.dto.tags.TagSummaryDTO;
import com.pol.blog_service.service.tags.TagsService;
import com.pol.blog_service.utils.AppConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TagsControllerTest {

    @InjectMocks
    private TagsController tagsController;

    @Mock
    private TagsService tagsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTags_ShouldReturnListOfTagSummaryDTO() {
        // Arrange
        TagSummaryDTO tag1 = TagSummaryDTO.builder().id(UUID.randomUUID()).tagName("Technology").build();
        TagSummaryDTO tag2 = TagSummaryDTO.builder().id(UUID.randomUUID()).tagName("Science").build();
        List<TagSummaryDTO> mockTags = List.of(tag1, tag2);

        when(tagsService.getAllTags()).thenReturn(mockTags);

        // Act
        ResponseEntity<List<TagSummaryDTO>> response = tagsController.getAllTags();

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(2);
        assertThat(response.getBody()).contains(tag1, tag2);
        verify(tagsService, times(1)).getAllTags();
    }

    @Test
    void getAssociatedBlogsByTagId_ShouldReturnTagPageResponseDTO() {
        // Arrange
        UUID tagId = UUID.randomUUID();
        int page = 0;
        int size = 10;
        String sortBy = AppConstants.SORT_BY_BLOG_PUBLISHED_AT;
        String order = AppConstants.ORDER;

        TagPageResponseDTO mockResponse = TagPageResponseDTO.builder()
                .blogs(Collections.emptyList())
                .totalPages(1)
                .totalElements(0)
                .build();

        when(tagsService.getBlogsByTagId(tagId, page, size, sortBy, order)).thenReturn(mockResponse);

        // Act
        ResponseEntity<TagPageResponseDTO> response = tagsController.getAssociatedBlogsByTagId(tagId, page, size, sortBy, order);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTotalPages()).isEqualTo(1);
        assertThat(response.getBody().getTotalElements()).isEqualTo(0);
        verify(tagsService, times(1)).getBlogsByTagId(tagId, page, size, sortBy, order);
    }
}
