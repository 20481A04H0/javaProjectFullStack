package com.iqquestlearning.be.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Trainer;
import com.iqquestlearning.be.models.CourseDto;
import com.iqquestlearning.be.models.CourseRequestDTO;
import com.iqquestlearning.be.models.CourseResponseDTO;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.repository.TrainerRepository;

import jakarta.transaction.Transactional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    public void saveCourse(CourseRequestDTO courserequestdto) {
        Course course = new Course();
        course.setName(courserequestdto.getName());
        courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Transactional
    public CourseDto getCourseDtoById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        List<String> trainerNames = course.getTrainers() != null 
                ? course.getTrainers().stream()
                    .map(Trainer::getName)
                    .toList()
                : new ArrayList<>();

        return new CourseDto(course.getId(), course.getName(), trainerNames);
    }


    public CourseDto updateCourse(CourseDto updatedDto) {
        Course existingCourse = courseRepository.findById(updatedDto.getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existingCourse.setName(updatedDto.getName());

        if (updatedDto.getTrainerNames() != null && !updatedDto.getTrainerNames().isEmpty()) {
            List<Trainer> matchedTrainers = trainerRepository.findByNameIn(updatedDto.getTrainerNames());
            existingCourse.setTrainers(matchedTrainers);
        }

        Course savedCourse = courseRepository.save(existingCourse);

        List<String> trainerNames = savedCourse.getTrainers() != null
                ? savedCourse.getTrainers().stream()
                    .map(Trainer::getName)
                    .collect(Collectors.toList())
                : new ArrayList<>();

        return new CourseDto(savedCourse.getId(), savedCourse.getName(), trainerNames);
    }

    @Transactional
    public void deleteCourseById(Long courseId) {
        courseRepository.deleteById(courseId);
    }

    public List<CourseResponseDTO> getAllCoursesList() {
        List<Course> courses = courseRepository.findAllByOrderByIdAsc();
        List<CourseResponseDTO> courseResponseDTOs = new ArrayList<>();

        for (Course course : courses) {
            CourseResponseDTO dto = new CourseResponseDTO();
            dto.setId(course.getId());
            dto.setName(course.getName());
            courseResponseDTOs.add(dto);
        }

        return courseResponseDTOs;
    }
    
    public List<Course> getAllCoursesForFrontend() {
        return courseRepository.findAll();
    }
}
