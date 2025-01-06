//package com.pol.product_service.controller;
//
//import com.pol.product_service.DTO.category.CategoryRequestDTO;
//import com.pol.product_service.DTO.category.CategoryResponseDTO;
//import com.pol.product_service.DTO.course.CourseRequestDTO;
//import com.pol.product_service.DTO.course.CourseResponseDTO;
//import com.pol.product_service.entity.CourseStatus;
//import com.pol.product_service.service.CategoryService;
//import com.pol.product_service.service.CourseService;
//import jakarta.servlet.http.HttpServletRequest;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.math.BigDecimal;
//import java.util.UUID;
//
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(MockitoExtension.class)
//public class AdminControllerTest {
//
//    @Mock
//    private CategoryService categoryService;
//
//    @Mock
//    private CourseService courseService;
//
//    @InjectMocks
//    private AdminController adminController;
//
//    @Test
//    void testCreateCategory() {
//        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
//        categoryRequestDTO.setName("Test Category");
//        categoryRequestDTO.setSummary("Category for testing");
//
//        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO(UUID.randomUUID(), "Test Category", "test-category", "Category for testing");
//
//        when(categoryService.createCategory(categoryRequestDTO)).thenReturn(categoryResponseDTO);
//
//        ResponseEntity<CategoryResponseDTO> response = adminController.createCategory(categoryRequestDTO);
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(categoryResponseDTO, response.getBody());
//        verify(categoryService, times(1)).createCategory(categoryRequestDTO);
//    }
//
//    @Test
//    void testUpdateCategoryById() {
//        UUID categoryId = UUID.randomUUID();
//        CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
//        categoryRequestDTO.setName("Updated Category");
//        categoryRequestDTO.setSummary("Updated Summary");
//
//        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO(categoryId, "Updated Category", "updated-category", "Updated Summary");
//
//        when(categoryService.updateCategory(categoryId, categoryRequestDTO)).thenReturn(categoryResponseDTO);
//
//        ResponseEntity<CategoryResponseDTO> response = adminController.updateCategoryById(categoryId, categoryRequestDTO);
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(categoryResponseDTO, response.getBody());
//        verify(categoryService, times(1)).updateCategory(categoryId, categoryRequestDTO);
//    }
//
//    @Test
//    void testDeleteCategoryById() {
//        UUID categoryId = UUID.randomUUID();
//
//        doNothing().when(categoryService).deleteCategoryById(categoryId);
//
//        ResponseEntity<String> response = adminController.deleteCategoryById(categoryId);
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals("Category deleted", response.getBody());
//        verify(categoryService, times(1)).deleteCategoryById(categoryId);
//    }
//
//    @Test
//    void testCreateCourse() {
//        CourseRequestDTO courseRequestDTO = new CourseRequestDTO();
//        courseRequestDTO.setTitle("Test Course");
//        courseRequestDTO.setDescription("Course for testing");
//        courseRequestDTO.setSummary("Summary of the course");
//        courseRequestDTO.setPrice(new BigDecimal("99.99"));
//        courseRequestDTO.setStatus(CourseStatus.ACTIVE);
//        courseRequestDTO.setCategoryId(UUID.randomUUID());
//
//        CourseResponseDTO courseResponseDTO = new CourseResponseDTO(UUID.randomUUID(), "Test Course", "Course for testing", "Summary of the course", new BigDecimal("99.99"), null, "instructor", UUID.randomUUID());
//
//        when(courseService.createCourse(courseRequestDTO, "user-id", "username")).thenReturn(courseResponseDTO);
//
//        ResponseEntity<CourseResponseDTO> response = adminController.CreateCourse(courseRequestDTO, "user-id", "username");
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(courseResponseDTO, response.getBody());
//        verify(courseService, times(1)).createCourse(courseRequestDTO, "user-id", "username");
//    }
//
//    @Test
//    void testUpdateCourseById() {
//        UUID courseId = UUID.randomUUID();
//        CourseRequestDTO courseRequestDTO = new CourseRequestDTO();
//        courseRequestDTO.setTitle("Updated Course");
//        courseRequestDTO.setDescription("Updated Course description");
//        courseRequestDTO.setSummary("Updated summary");
//        courseRequestDTO.setPrice(new BigDecimal("149.99"));
//        courseRequestDTO.setStatus(CourseStatus.ACTIVE);
//        courseRequestDTO.setCategoryId(UUID.randomUUID());
//
//        CourseResponseDTO courseResponseDTO = new CourseResponseDTO(courseId, "Updated Course", "Updated Course description", "Updated summary", new BigDecimal("149.99"), null, "instructor", UUID.randomUUID());
//
//        when(courseService.updateCourseById(courseId, courseRequestDTO, "user-id")).thenReturn(courseResponseDTO);
//
//        ResponseEntity<CourseResponseDTO> response = adminController.updateCourseById(courseId, courseRequestDTO, "user-id");
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(courseResponseDTO, response.getBody());
//        verify(courseService, times(1)).updateCourseById(courseId, courseRequestDTO, "user-id");
//    }
//
//    @Test
//    void testDeleteCourseById() {
//        UUID courseId = UUID.randomUUID();
//
//        doNothing().when(courseService).deleteCourseById(courseId, "user-id");
//
//        adminController.deleteCourseById(courseId, "user-id");
//
//        verify(courseService, times(1)).deleteCourseById(courseId, "user-id");
//    }
//}
