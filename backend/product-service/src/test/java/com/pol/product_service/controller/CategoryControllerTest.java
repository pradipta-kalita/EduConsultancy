package com.pol.product_service.controller;

import com.pol.product_service.DTO.category.CategoryResponseDTO;
import com.pol.product_service.entity.Category;
import com.pol.product_service.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private UUID categoryId;
    private Category category;
    private CategoryResponseDTO categoryResponseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoryId = UUID.randomUUID();
        category = Category.builder()
                .id(categoryId)
                .name("Sample Category")
                .summary("Sample Summary")
                .slug("sample-category")
                .build();

        categoryResponseDTO = CategoryResponseDTO.builder()
                .id(categoryId)
                .name("Sample Category")
                .slug("sample-category")
                .summary("Sample Summary")
                .build();
    }

    @Test
    void testGetAllCategories() {
        // Given
        List<CategoryResponseDTO> categoryList = List.of(categoryResponseDTO);
        given(categoryService.getAllCategories()).willReturn(categoryList);

        // When
        ResponseEntity<List<CategoryResponseDTO>> response = categoryController.getAllCategories();

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(categoryList);
        verify(categoryService).getAllCategories();
    }

    @Test
    void testGetCategoryById() {
        // Given
        given(categoryService.getCategoryById(categoryId)).willReturn(category);

        // When
        ResponseEntity<Category> response = categoryController.getCategoryById(categoryId);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(category);
        verify(categoryService).getCategoryById(categoryId);
    }
}
