package com.iqquestlearning.be.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Trainer;
import com.iqquestlearning.be.models.CourseDto;
import com.iqquestlearning.be.models.CourseRequestDTO;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.service.CourseService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseService courseService;

    // ✅ Save Course
    @PostMapping("/saveCourse")
    public ResponseEntity<String> saveCourse(@Valid @RequestBody CourseRequestDTO courserequestdto,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation errors occurred.");
        }
        try {
            courseService.saveCourse(courserequestdto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Course created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating course: " + e.getMessage());
        }
    }

    // ✅ Get All Courses as DTO list
    @GetMapping("/getAllCoursesList")
    @Transactional
    public List<CourseDto> getAllCoursesList() {
        List<Course> courses = courseRepository.findAll();

        return courses.stream()
                .map(course -> {
                    List<String> trainerNames = course.getTrainers() != null
                            ? course.getTrainers().stream()
                                    .map(Trainer::getName)
                                    .toList()
                            : List.of();

                    return new CourseDto(course.getId(), course.getName(), trainerNames);
                })
                .toList();
    }

    // ✅ Get Courses Count
    @GetMapping("/getCoursesCount")
    public ResponseEntity<Long> getCoursesCount() {
        long count = courseRepository.count();
        return ResponseEntity.ok(count);
    }

    // ✅ Get Course by ID (Long not int)
    @GetMapping("/getCourseById/{id}")
    public ResponseEntity<?> getCourseDtoById(@PathVariable Long id) {
        try {
            CourseDto course = courseService.getCourseDtoById(id);
            return ResponseEntity.ok(course);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Course not found with id: " + id);
        }
    }

    // ✅ Update Course
    @PutMapping("/updateCourse")
    public ResponseEntity<CourseDto> updateCourse(@RequestBody CourseDto updatedCourse) {
        CourseDto course = courseService.updateCourse(updatedCourse);
        return ResponseEntity.ok(course);
    }

    // ✅ Delete Course
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        try {
            if (!courseRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Course not found with id: " + id);
            }
            courseService.deleteCourseById(id);
            return ResponseEntity.ok("Course deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting course: " + e.getMessage());
        }
    }

    // ✅ Get All Courses (Entity version)
    @GetMapping("/getAllCourses")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    // ✅ Get All Courses for Frontend (matches frontend API calls)
    @GetMapping("/allCourse")
    public List<Course> getAllCoursesForFrontend() {
        return courseService.getAllCoursesForFrontend();
    }
}
