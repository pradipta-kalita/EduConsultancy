package com.pol.blog_service.service;

import com.pol.blog_service.dto.blog.BlogSummaryDTO;
import com.pol.blog_service.dto.tags.TagPageResponseDTO;
import com.pol.blog_service.dto.tags.TagRequestDTO;
import com.pol.blog_service.dto.tags.TagResponseDTO;
import com.pol.blog_service.dto.tags.TagSummaryDTO;
import com.pol.blog_service.entity.Tags;
import com.pol.blog_service.repository.BlogRepository;
import com.pol.blog_service.repository.TagsRepository;
import com.pol.blog_service.service.tags.TagsServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.BDDMockito.then;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public class TagsServiceTests {
    @Mock
    private TagsRepository tagsRepository;

    @Mock
    private BlogRepository blogRepository;

    @InjectMocks
    private TagsServiceImpl tagsService;


    @DisplayName("JUnit test for tagsService.createTag() method")
    @Test
    void givenTagRequestDTO_whenCreateTag_thenReturnTagResponseDTO() {
        // Given
        String tagName = "Technology";
        TagRequestDTO requestDTO = TagRequestDTO.builder()
                .tagname(tagName)
                .build();
        Tags mockSavedTag = Tags.builder()
                .id(UUID.randomUUID())
                .tagName(tagName)
                .build();
        TagResponseDTO expectedResponse = TagResponseDTO.builder()
                .id(mockSavedTag.getId())
                .tagName(tagName)
                .build();

        // Mock repository behavior
        BDDMockito.given(tagsRepository.save(argThat(tag -> tag.getTagName().equals(tagName))))
                .willReturn(mockSavedTag);

        // When
        TagResponseDTO result = tagsService.createTag(requestDTO);

        // Then
        then(tagsRepository).should()
                .save(argThat(tag -> tag.getTagName().equals(tagName)));
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(expectedResponse.getId());
        assertThat(result.getTagName()).isEqualTo(expectedResponse.getTagName());
    }

    @DisplayName("JUnit test for tagsService.updateTagById() method")
    @Test
    void givenIdAndRequestDTO_whenUpdateById_thenReturnTagResponseDTO() {
        // Given
        UUID id = UUID.randomUUID();
        TagRequestDTO requestDTO = TagRequestDTO.builder().tagname("UpdatedTag").build();
        Tags existingTag = Tags.builder().id(id).tagName("OldTag").build();
        Tags updatedTag = Tags.builder().id(id).tagName("UpdatedTag").build();
        TagResponseDTO summaryDTO = TagResponseDTO.builder().id(id).tagName("UpdatedTag").build();

        BDDMockito.given(tagsRepository.existsById(id)).willReturn(true);
        BDDMockito.given(tagsRepository.findById(id)).willReturn(Optional.of(existingTag));
        BDDMockito.given(tagsRepository.save(any(Tags.class))).willReturn(updatedTag);

        // When
        TagResponseDTO result = tagsService.updateTagById(id, requestDTO);

        // Then
        then(tagsRepository).should().existsById(id);
        then(tagsRepository).should().findById(id);
        then(tagsRepository).should().save(existingTag);
        assertThat(result).isNotNull();
        assertThat((result.getId())).isEqualTo(id);
        assertThat(result.getTagName()).isEqualTo("UpdatedTag");
    }

    @DisplayName("JUnit test for tagsService.getBlogsByTagId() method")
    @Test
    public void givenTagId_whenGetBlogsByTagId_thenReturnTagPageResponseDTO(){
        // Given
        UUID tagId = UUID.randomUUID();
        int page = 0, size = 5;
        String sortBy = "publishedAt";
        String order = "desc";

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc(sortBy)));
        Page<BlogSummaryDTO> blogPage = Mockito.mock(Page.class);
        BDDMockito.given(tagsRepository.existsById(tagId)).willReturn(true);
        BDDMockito.given(blogRepository.findPublishedBlogsByTagId(tagId, pageable)).willReturn(blogPage);

        // When
        TagPageResponseDTO result = tagsService.getBlogsByTagId(tagId, page, size, sortBy, order);

        // Then
        then(tagsRepository).should().existsById(tagId);
        then(blogRepository).should().findPublishedBlogsByTagId(tagId, pageable);
        assertThat(result).isNotNull();
        then(blogPage).should().getContent();
    }

    @DisplayName("JUnit test for tagsService.deleteTagById() method")
    @Test
    public void givenId_whenDeleteTagById_thenDeleteTagAndNoReturn(){
        // Given
        UUID tagId = UUID.randomUUID();
        BDDMockito.given(tagsRepository.existsById(tagId)).willReturn(true);

        // When
        tagsService.deleteTagById(tagId);

        // Then
        then(tagsRepository).should().existsById(tagId);
        then(tagsRepository).should().deleteTagAssociations(tagId);
        then(tagsRepository).should().deleteById(tagId);
    }

    @DisplayName("JUnit test for tagsService.getAllTags() method")
    @Test
    public void whenGetAllTags_thenReturnTagSummaryDTOList(){
        // Given
        List<TagSummaryDTO> summaryDTOList = List.of(
                TagSummaryDTO.builder().id(UUID.randomUUID()).tagName("Tech").build(),
                TagSummaryDTO.builder().id(UUID.randomUUID()).tagName("Science").build()
        );

        BDDMockito.given(tagsRepository.getAllTagSummary()).willReturn(summaryDTOList);

        // When
        List<TagSummaryDTO> result = tagsService.getAllTags();

        // Then
        then(tagsRepository).should().getAllTagSummary();
        assertThat(result).hasSize(2);
        assertThat(result.getFirst().getTagName()).isEqualTo("Tech");
    }
}
