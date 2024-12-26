package com.pol.blog_service.controller;

import com.pol.blog_service.dto.blog.BlogPageResponseDTO;
import com.pol.blog_service.dto.blog.BlogResponseDTO;
import com.pol.blog_service.entity.BlogStatus;
import com.pol.blog_service.service.blog.BlogService;
import com.pol.blog_service.utils.AppConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class BlogControllerTest {

    @InjectMocks
    private BlogController blogController;

    @Mock
    private BlogService blogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void hello_ShouldReturnHelloMessage() {
        // Act
        String response = blogController.hello();

        // Assert
        assertThat(response).isEqualTo("Hello Guest users");
    }

    @Test
    void getBlogById_ShouldReturnBlogResponseDTO() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        BlogResponseDTO mockResponse = BlogResponseDTO.builder()
                .id(blogId)
                .title("Sample Blog")
                .content("This is a sample content.")
                .build();

        when(blogService.getBlogById(blogId)).thenReturn(mockResponse);

        // Act
        ResponseEntity<BlogResponseDTO> response = blogController.getBlogById(blogId);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(blogId);
        assertThat(response.getBody().getTitle()).isEqualTo("Sample Blog");
        verify(blogService, times(1)).getBlogById(blogId);
    }

    @Test
    void getAllBlogs_ShouldReturnBlogPageResponseDTO() {
        // Arrange
        int page = 0;
        int size = 10;
        String sortBy = AppConstants.SORT_BY_BLOG_PUBLISHED_AT;
        String order = AppConstants.ORDER;
        String status = AppConstants.STATUS;

        BlogPageResponseDTO mockResponse = BlogPageResponseDTO.builder()
                .blogs(Collections.emptyList())
                .totalPages(1)
                .totalElements(0)
                .build();


        when(blogService.getAllBlogs(page, size, sortBy, order,BlogStatus.PUBLISHED)).thenReturn(mockResponse);

        // Act
        ResponseEntity<BlogPageResponseDTO> response = blogController.getAllBlogs(page, size, sortBy, order,status);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTotalPages()).isEqualTo(1);
        assertThat(response.getBody().getTotalElements()).isEqualTo(0);
        verify(blogService, times(1)).getAllBlogs(page, size, sortBy, order,BlogStatus.PUBLISHED);
    }

    @Test
    void searchBlogsByKeyword_ShouldReturnBlogPageResponseDTO() {
        // Arrange
        String keyword = "sample";
        int page = 0;
        int size = 10;
        String sortBy = AppConstants.SORT_BY_BLOG_PUBLISHED_AT;
        String order = AppConstants.ORDER;

        BlogPageResponseDTO mockResponse = BlogPageResponseDTO.builder()
                .blogs(Collections.emptyList())
                .totalPages(1)
                .totalElements(0)
                .build();

        when(blogService.searchBlogsByKeyword(keyword, page, size, sortBy, order)).thenReturn(mockResponse);

        // Act
        ResponseEntity<BlogPageResponseDTO> response = blogController.searchBlogsByKeyword(keyword, page, size, sortBy, order);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTotalPages()).isEqualTo(1);
        assertThat(response.getBody().getTotalElements()).isEqualTo(0);
        verify(blogService, times(1)).searchBlogsByKeyword(keyword, page, size, sortBy, order);
    }
}
