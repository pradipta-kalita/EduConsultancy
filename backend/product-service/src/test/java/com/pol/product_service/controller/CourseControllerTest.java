package com.pol.product_service.controller;

import com.pol.product_service.DTO.course.CoursePageResponseDTO;
import com.pol.product_service.DTO.course.CoursePriceDTO;
import com.pol.product_service.DTO.course.CourseResponseDTO;
import com.pol.product_service.DTO.course.CourseSummaryDTO;
import com.pol.product_service.service.CourseService;
import com.pol.product_service.utils.AppConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class CourseControllerTest {

    @Mock
    private CourseService courseService;

    @InjectMocks
    private CourseController courseController;

    private UUID courseId;
    private CourseResponseDTO courseResponseDTO;
    private CoursePriceDTO coursePriceDTO;
    private CoursePageResponseDTO coursePageResponseDTO;
    private CourseSummaryDTO courseSummaryDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Prepare mock data
        courseId = UUID.randomUUID();

        // Prepare CourseResponseDTO
        courseResponseDTO = CourseResponseDTO.builder()
                .id(courseId)
                .title("Sample Course")
                .description("Course Description")
                .summary("Course Summary")
                .price(BigDecimal.valueOf(99.99))
                .instructor("Instructor Name")
                .instructorId(UUID.randomUUID())
                .build();

        // Prepare CoursePriceDTO
        coursePriceDTO = new CoursePriceDTO(courseId, BigDecimal.valueOf(99.99));

        // Prepare CourseSummaryDTO for the course list
        courseSummaryDTO = CourseSummaryDTO.builder()
                .id(courseId)
                .title("Sample Course")
                .summary("Course Summary")
                .build();

        // Prepare CoursePageResponseDTO
        coursePageResponseDTO = CoursePageResponseDTO.builder()
                .courses(List.of(courseSummaryDTO))
                .totalElements(1)
                .totalPages(1)
                .currentPage(0)
                .pageSize(10)
                .hasNext(false)
                .hasPrevious(false)
                .build();
    }

    @Test
    void testGetAllCourses() {
        // Given
        given(courseService.getAllCourse(0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER))
                .willReturn(coursePageResponseDTO);

        // When
        ResponseEntity<CoursePageResponseDTO> response = courseController.getAllCourse(0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(coursePageResponseDTO);
        verify(courseService).getAllCourse(0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER);
    }

    @Test
    void testSearchByKeyword() {
        // Given
        String keyword = "Sample";
        given(courseService.searchByKeyword(keyword, 0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER))
                .willReturn(coursePageResponseDTO);

        // When
        ResponseEntity<CoursePageResponseDTO> response = courseController.searchByKeyword(keyword, 0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(coursePageResponseDTO);
        verify(courseService).searchByKeyword(keyword, 0, 10, AppConstants.SORT_BY_COURSE_TITLE, AppConstants.ORDER);
    }

    @Test
    void testGetCourseById() {
        // Given
        given(courseService.getCourseById(courseId)).willReturn(courseResponseDTO);

        // When
        ResponseEntity<CourseResponseDTO> response = courseController.getCourseById(courseId);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(courseResponseDTO);
        verify(courseService).getCourseById(courseId);
    }

    @Test
    void testGetCoursePriceById() {
        // Given
        given(courseService.getCoursePriceById(courseId)).willReturn(coursePriceDTO);

        // When
        CoursePriceDTO response = courseController.getCoursePriceById(courseId);

        // Then
        assertThat(response).isNotNull();
        assertThat(response).isEqualTo(coursePriceDTO);
        verify(courseService).getCoursePriceById(courseId);
    }
}
