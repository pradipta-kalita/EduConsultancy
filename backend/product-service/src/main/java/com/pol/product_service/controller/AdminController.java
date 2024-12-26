package com.pol.product_service.controller;

import com.pol.product_service.DTO.category.CategoryRequestDTO;
import com.pol.product_service.DTO.category.CategoryResponseDTO;
import com.pol.product_service.DTO.course.AdminCourseResponseDTO;
import com.pol.product_service.DTO.course.CourseRequestDTO;
import com.pol.product_service.DTO.course.CourseResponseDTO;
import com.pol.product_service.service.CategoryService;
import com.pol.product_service.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CategoryService categoryService;
    private final CourseService courseService;


    public AdminController(CategoryService categoryService, CourseService courseService) {
        this.categoryService = categoryService;
        this.courseService = courseService;
    }


    //////////////////////////////////////////////////////////////////////////
    ////////////////////////// CATEGORY CONTROLLERS //////////////////////////
    //////////////////////////////////////////////////////////////////////////


    @PostMapping("/categories")
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody @Valid CategoryRequestDTO categoryRequestDTO){
        return ResponseEntity.ok(categoryService.createCategory(categoryRequestDTO));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategoryById(@PathVariable UUID id, @RequestBody @Valid CategoryRequestDTO categoryRequestDTO){
        return ResponseEntity.ok(categoryService.updateCategory(id,categoryRequestDTO));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable UUID id){
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok("Category deleted");
    }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////// COURSE CONTROLLERS //////////////////////////////
    //////////////////////////////////////////////////////////////////////////


    @PostMapping("/courses")
    public ResponseEntity<CourseResponseDTO> CreateCourse(@RequestBody @Valid CourseRequestDTO courseRequestDTO,
                                                          @RequestHeader("X-User-Id") String userId,
                                                          @RequestHeader("X-User-Name") String username){
        return ResponseEntity.ok(courseService.createCourse(courseRequestDTO,userId,username));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseResponseDTO> updateCourseById(@PathVariable UUID id,
                                                              @RequestBody @Valid CourseRequestDTO courseRequestDTO,
                                                              @RequestHeader("X-User-Id") String userId){
        return ResponseEntity.ok(courseService.updateCourseById(id,courseRequestDTO,userId));
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<AdminCourseResponseDTO> getCourseById(@PathVariable UUID id){
        return ResponseEntity.ok(courseService.getCourseByIdForAdmin(id));
    }

    @DeleteMapping("/courses/{id}")
    public void deleteCourseById(@PathVariable UUID id,
                                 @RequestHeader("X-User-Id") String userId){
        courseService.deleteCourseById(id,userId);
    }

}
