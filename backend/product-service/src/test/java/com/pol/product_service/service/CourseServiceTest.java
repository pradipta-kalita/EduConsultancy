//package com.pol.product_service.service;
//
//import com.pol.product_service.DTO.course.*;
//import com.pol.product_service.entity.Category;
//import com.pol.product_service.entity.Course;
//import com.pol.product_service.entity.CourseStatus;
//import com.pol.product_service.exceptions.customExceptions.CategoryNotFoundException;
//import com.pol.product_service.exceptions.customExceptions.CourseNotFoundException;
//import com.pol.product_service.exceptions.customExceptions.UnauthorizedActionException;
//import com.pol.product_service.repository.CategoryRepository;
//import com.pol.product_service.repository.CourseRepository;
//import com.pol.product_service.mapper.CourseMapper;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class CourseServiceTest {
//
//    @Mock
//    private CourseRepository courseRepository;
//
//    @Mock
//    private CategoryRepository categoryRepository;
//
//    @InjectMocks
//    private CourseService courseService;
//
//    private Course course;
//    private Category category;
//    private UUID courseId;
//    private UUID categoryId;
//
//    @BeforeEach
//    public void setup() {
//        categoryId = UUID.randomUUID();
//        category = new Category(categoryId, "Science", "science", "Science related courses", null);
//        courseId = UUID.randomUUID();
//        course = new Course(courseId, "Course Title", "Course Description", "Course Summary", BigDecimal.valueOf(100),
//                            "Instructor", UUID.randomUUID(), category, CourseStatus.ACTIVE, LocalDateTime.now(), LocalDateTime.now());
//    }
//
//    @Test
//    public void testCreateCourse() {
//        // Arrange
//        CourseRequestDTO courseRequestDTO = new CourseRequestDTO();
//        courseRequestDTO.setTitle("New Course");
//        courseRequestDTO.setDescription("Description");
//        courseRequestDTO.setSummary("Summary");
//        courseRequestDTO.setPrice(BigDecimal.valueOf(99.99));
//        courseRequestDTO.setStatus(CourseStatus.ACTIVE);
//        courseRequestDTO.setCategoryId(categoryId);
//
//        // Mock category and course repositories
//        when(categoryRepository.findById(courseRequestDTO.getCategoryId())).thenReturn(Optional.of(category));
//        when(courseRepository.save(any(Course.class))).thenReturn(course);
//
//        // Act
//        CourseResponseDTO result = courseService.createCourse(courseRequestDTO, UUID.randomUUID().toString(), "instructorName");
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(course.getTitle(), result.getTitle());
//        verify(courseRepository).save(any(Course.class));  // Verifying that the save method was called
//    }
//
//
//
//
//    @Test
//    public void testGetCourseById() {
//        // Arrange
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//
//        // Act
//        CourseResponseDTO result = courseService.getCourseById(courseId);
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(course.getTitle(), result.getTitle());
//    }
//
//    @Test
//    public void testGetCourseById_ThrowsException_WhenNotFound() {
//        // Arrange
//        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThrows(CourseNotFoundException.class, () -> courseService.getCourseById(courseId));
//    }
//
//    @Test
//    public void testDeleteCourseById() {
//        // Arrange
//        String userId = course.getInstructorId().toString();
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//
//        // Act
//        courseService.deleteCourseById(courseId, userId);
//
//        // Assert
//        verify(courseRepository).deleteById(courseId);
//    }
//
//    @Test
//    public void testDeleteCourseById_ThrowsException_WhenUnauthorized() {
//        // Arrange
//        String userId = UUID.randomUUID().toString();
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//
//        // Act & Assert
//        assertThrows(UnauthorizedActionException.class, () -> courseService.deleteCourseById(courseId, userId));
//    }
//
//    @Test
//    public void testUpdateCourseById() {
//        // Arrange
//        CourseRequestDTO updateDTO = new CourseRequestDTO();
//        updateDTO.setTitle("Updated Course");
//        updateDTO.setDescription("Updated Description");
//        updateDTO.setSummary("Updated Summary");
//        updateDTO.setPrice(BigDecimal.valueOf(150));
//        updateDTO.setStatus(CourseStatus.ACTIVE);
//        updateDTO.setCategoryId(categoryId);
//
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
//        when(courseRepository.save(any(Course.class))).thenReturn(course);
//
//        // Act
//        CourseResponseDTO result = courseService.updateCourseById(courseId, updateDTO, course.getInstructorId().toString());
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(updateDTO.getTitle(), result.getTitle());
//    }
//
//
//    @Test
//    public void testSearchByKeyword() {
//        // Arrange
//        PageRequest pageable = PageRequest.of(0, 10, Sort.by(Sort.Order.asc("title")));
//        CourseSummaryDTO courseSummaryDTO = new CourseSummaryDTO(courseId, "Course Title", "Course Summary", BigDecimal.valueOf(100), "Instructor");
//        Page<CourseSummaryDTO> coursePage = new PageImpl<>(java.util.List.of(courseSummaryDTO), pageable, 1);
//
//        // Update the stubbing to match the exact arguments used in the service method
//        when(courseRepository.searchByKeyword("keyword", pageable)).thenReturn(coursePage);
//
//        // Act
//        CoursePageResponseDTO result = courseService.searchByKeyword("keyword", 0, 10, "title", "asc");
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(1, result.getCourses().size());
//        assertEquals(courseSummaryDTO.getTitle(), result.getCourses().get(0).getTitle());
//    }
//
//}
