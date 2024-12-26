package com.pol.blog_service.controller;

import com.pol.blog_service.dto.blog.BlogRequestDTO;
import com.pol.blog_service.dto.blog.BlogResponseDTO;
import com.pol.blog_service.dto.tags.TagRequestDTO;
import com.pol.blog_service.dto.tags.TagResponseDTO;
import com.pol.blog_service.service.blog.BlogService;
import com.pol.blog_service.service.tags.TagsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class AdminControllerTest {

    @InjectMocks
    private AdminController adminController;

    @Mock
    private BlogService blogService;

    @Mock
    private TagsService tagsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    

    @Test
    void createBlog_ShouldReturnBlogResponseDTO() {
        // Arrange
        BlogRequestDTO blogRequestDTO = BlogRequestDTO.builder()
                .title("Sample Blog")
                .content("This is a sample blog content.")
                .build();
        BlogResponseDTO blogResponseDTO = BlogResponseDTO.builder()
                .id(UUID.randomUUID())
                .title(blogRequestDTO.getTitle())
                .build();

        when(blogService.createBlog(blogRequestDTO, "userId", "username")).thenReturn(blogResponseDTO);

        // Act
        ResponseEntity<BlogResponseDTO> response = adminController.createBlog(blogRequestDTO, "userId", "username");

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTitle()).isEqualTo(blogRequestDTO.getTitle());
        verify(blogService, times(1)).createBlog(blogRequestDTO, "userId", "username");
    }

    @Test
    void updateBlogById_ShouldReturnUpdatedBlogResponseDTO() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        BlogRequestDTO blogRequestDTO = BlogRequestDTO.builder()
                .title("Updated Blog Title")
                .content("Updated Content")
                .build();
        BlogResponseDTO blogResponseDTO = BlogResponseDTO.builder()
                .id(blogId)
                .title(blogRequestDTO.getTitle())
                .build();

        when(blogService.updateBlog(blogRequestDTO, blogId, "userId")).thenReturn(blogResponseDTO);

        // Act
        ResponseEntity<BlogResponseDTO> response = adminController.updateBlogById(blogId, blogRequestDTO, "userId");

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(blogId);
        assertThat(response.getBody().getTitle()).isEqualTo(blogRequestDTO.getTitle());
        verify(blogService, times(1)).updateBlog(blogRequestDTO, blogId, "userId");
    }

    @Test
    void deleteBlogById_ShouldInvokeServiceMethod() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        String userId = "userId";

        // Act
        adminController.deleteBlogById(blogId, userId);

        // Assert
        verify(blogService, times(1)).deleteBlogById(blogId, userId);
    }

    @Test
    void createTag_ShouldReturnTagResponseDTO() {
        // Arrange
        TagRequestDTO tagRequestDTO = TagRequestDTO.builder().tagname("Technology").build();
        TagResponseDTO tagResponseDTO = TagResponseDTO.builder().id(UUID.randomUUID()).tagName(tagRequestDTO.getTagname()).build();

        when(tagsService.createTag(tagRequestDTO)).thenReturn(tagResponseDTO);

        // Act
        ResponseEntity<TagResponseDTO> response = adminController.createTag(tagRequestDTO);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getTagName()).isEqualTo(tagRequestDTO.getTagname());
        verify(tagsService, times(1)).createTag(tagRequestDTO);
    }

    @Test
    void deleteTagById_ShouldInvokeServiceMethod() {
        // Arrange
        UUID tagId = UUID.randomUUID();

        // Act
        adminController.deleteTagById(tagId);

        // Assert
        verify(tagsService, times(1)).deleteTagById(tagId);
    }
}
