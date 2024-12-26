package com.pol.product_service.service;

import com.pol.product_service.DTO.category.CategoryRequestDTO;
import com.pol.product_service.DTO.category.CategoryResponseDTO;
import com.pol.product_service.entity.Category;
import com.pol.product_service.entity.Course;
import com.pol.product_service.exceptions.customExceptions.CategoryNotFoundException;
import com.pol.product_service.mapper.CategoryMapper;
import com.pol.product_service.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private UUID categoryId;
    private Category category;
    private CategoryRequestDTO categoryRequestDTO;
    private CategoryResponseDTO categoryResponseDTO;

    @BeforeEach
    void setUp() {
        categoryId = UUID.randomUUID();
        category = Category.builder()
                .id(categoryId)
                .name("Sample Category")
                .summary("Sample Summary")
                .slug("sample-category")
                .build();

        categoryRequestDTO = new CategoryRequestDTO();
        categoryRequestDTO.setName("Updated Category");
        categoryRequestDTO.setSummary("Updated Summary");

        categoryResponseDTO = CategoryResponseDTO.builder()
                .id(categoryId)
                .name("Updated Category")
                .slug("updated-category")
                .summary("Updated Summary")
                .build();
    }

    @Test
    void testCreateCategory() {
        // Given
        given(categoryRepository.save(any(Category.class))).willReturn(category);

        // When
        CategoryResponseDTO result = categoryService.createCategory(categoryRequestDTO);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo(category.getName());
        then(categoryRepository).should().save(any(Category.class));
    }

    @Test
    void testUpdateCategory() {
        // Given
        given(categoryRepository.findById(categoryId)).willReturn(Optional.of(category));
        given(categoryRepository.save(any(Category.class))).willReturn(category);

        // When
        CategoryResponseDTO result = categoryService.updateCategory(categoryId, categoryRequestDTO);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo(categoryRequestDTO.getName());
        then(categoryRepository).should().findById(categoryId);
        then(categoryRepository).should().save(any(Category.class));
    }

    @Test
    void testGetCategoryById() {
        // Given
        given(categoryRepository.findById(categoryId)).willReturn(Optional.of(category));

        // When
        Category result = categoryService.getCategoryById(categoryId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(categoryId);
        then(categoryRepository).should().findById(categoryId);
    }

    @Test
    void testDeleteCategoryById() {
        // Given
        Course course = Course.builder().id(UUID.randomUUID()).title("Sample Course").build();
        List<Course> courses = List.of(course);
        category.setCourses(courses); // Initialize the courses list in the Category entity
        given(categoryRepository.findById(categoryId)).willReturn(Optional.of(category));

        // When
        categoryService.deleteCategoryById(categoryId);

        // Then
        then(categoryRepository).should().findById(categoryId);
        then(categoryRepository).should().deleteById(categoryId);
    }


    @Test
    void testGetCategoryByIdThrowsException() {
        // Given
        given(categoryRepository.findById(categoryId)).willReturn(Optional.empty());

        // When & Then
        assertThrows(CategoryNotFoundException.class, () -> categoryService.getCategoryById(categoryId));
        then(categoryRepository).should().findById(categoryId);
    }
}
