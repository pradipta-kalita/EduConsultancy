package com.pol.blog_service.service;

import com.pol.blog_service.dto.blog.*;
import com.pol.blog_service.entity.Blog;
import com.pol.blog_service.entity.BlogStatus;
import com.pol.blog_service.entity.Tags;
import com.pol.blog_service.exception.customExceptions.EntityNotFound;
import com.pol.blog_service.exception.customExceptions.UnauthorizedActionException;
import com.pol.blog_service.mapper.BlogMapper;
import com.pol.blog_service.repository.BlogRepository;
import com.pol.blog_service.repository.TagsRepository;
import com.pol.blog_service.service.blog.BlogServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BlogServiceImplTest {

    @Mock
    private BlogRepository blogRepository;

    @Mock
    private TagsRepository tagsRepository;

    @InjectMocks
    private BlogServiceImpl blogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBlog_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        String userName = "testUser";
        BlogRequestDTO blogRequestDTO = BlogRequestDTO.builder()
                .title("Sample Blog")
                .content("This is a sample blog content.")
                .status(BlogStatus.DRAFT)
                .tagIds(Set.of(UUID.randomUUID()))
                .build();

        Tags tag = Tags.builder().id(UUID.randomUUID()).tagName("Technology").build();
        Blog blog = BlogMapper.toEntity(blogRequestDTO);
        blog.setTags(Set.of(tag));
        blog.setAuthorId(userId);
        blog.setAuthor(userName);
        blog.setPublishedAt(LocalDateTime.now());

        when(tagsRepository.findAllById(blogRequestDTO.getTagIds())).thenReturn(Collections.singletonList(tag));
        when(blogRepository.save(any(Blog.class))).thenReturn(blog);

        // Act
        BlogResponseDTO result = blogService.createBlog(blogRequestDTO, userId.toString(), userName);

        // Assert
        assertNotNull(result);
        assertEquals(blogRequestDTO.getTitle(), result.getTitle());
        assertEquals(userId, blog.getAuthorId());
        assertEquals(userName, blog.getAuthor());
        verify(blogRepository, times(1)).save(any(Blog.class));
    }

    @Test
    void createBlog_TagNotFound_ThrowsException() {
        // Arrange
        BlogRequestDTO blogRequestDTO = BlogRequestDTO.builder()
                .title("Sample Blog")
                .content("This is a sample blog content.")
                .status(BlogStatus.DRAFT)
                .tagIds(Set.of(UUID.randomUUID()))
                .build();

        when(tagsRepository.findAllById(blogRequestDTO.getTagIds())).thenReturn(Collections.emptyList());

        // Act & Assert
        assertThrows(NullPointerException.class, () -> blogService.createBlog(blogRequestDTO, UUID.randomUUID().toString(), "testUser"));
    }

    @Test
    void getBlogById_Success() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        String userName = "testUser";
        Tags tag = Tags.builder().id(UUID.randomUUID()).tagName("Technology").build();
        Blog blog = Blog.builder()
                .id(blogId)
                .title("Sample Blog")
                .content("This is a sample blog content.")
                .status(BlogStatus.PUBLISHED) // Use DRAFT to simulate null publishedAt
                .authorId(userId)
                .author(userName)
                .tags(Set.of(tag))
                .publishedAt(LocalDateTime.now()) // Explicitly set null for unpublished blogs
                .build();

        when(blogRepository.findById(blogId)).thenReturn(Optional.of(blog));

        // Act
        BlogResponseDTO result = blogService.getBlogById(blogId);

        // Assert
        assertNotNull(result);
        assertEquals(blogId, result.getId());
        assertEquals(userId, blog.getAuthorId());
        assertEquals(userName, blog.getAuthor());

        assertThat(blog.getPublishedAt()).isBeforeOrEqualTo(LocalDateTime.now());
        verify(blogRepository, times(1)).findById(blogId);
    }


    @Test
    void getBlogById_NotFound_ThrowsException() {
        // Arrange
        UUID blogId = UUID.randomUUID();

        when(blogRepository.findById(blogId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFound.class, () -> blogService.getBlogById(blogId));
    }

    @Test
    void searchBlogs_Success() {
        // Arrange
        String keyword = "sample";
        int page = 0;
        int size = 10;
        String sortBy = "title";
        String order = "asc";
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortBy)));
        BlogSummaryDTO blogSummary = new BlogSummaryDTO(UUID.randomUUID(), "Sample Blog",  LocalDateTime.now(), "This is a sample blog content.", BlogStatus.PUBLISHED, "testUser", UUID.randomUUID(), "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Z7FRbJlCIIcBgNT74dhKiA.png");
        Page<BlogSummaryDTO> blogPage = new PageImpl<>(Collections.singletonList(blogSummary));

        when(blogRepository.searchByKeyword(keyword, pageable)).thenReturn(blogPage);

        // Act
        BlogPageResponseDTO result = blogService.searchBlogsByKeyword(keyword, page, size, sortBy, order);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(blogRepository, times(1)).searchByKeyword(keyword, pageable);
    }

    @Test
    void deleteBlogById_Success() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        Blog blog = Blog.builder()
                .id(blogId)
                .status(BlogStatus.DRAFT)
                .authorId(userId)
                .build();

        when(blogRepository.findById(blogId)).thenReturn(Optional.of(blog));
        doNothing().when(blogRepository).deleteById(blogId);

        // Act
        blogService.deleteBlogById(blogId, userId.toString());

        // Assert
        verify(blogRepository, times(1)).deleteById(blogId);
    }

    @Test
    void deleteBlogById_UnauthorizedAction_ThrowsException() {
        // Arrange
        UUID blogId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        Blog blog = Blog.builder()
                .id(blogId)
                .status(BlogStatus.DRAFT)
                .authorId(UUID.randomUUID())
                .build();

        when(blogRepository.findById(blogId)).thenReturn(Optional.of(blog));

        // Act & Assert
        assertThrows(UnauthorizedActionException.class, () -> blogService.deleteBlogById(blogId, userId.toString()));
    }
}
