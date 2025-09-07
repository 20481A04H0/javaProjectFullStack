package com.iqquestlearning.be.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Student;
import com.iqquestlearning.be.models.StudentRequestDTO;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.repository.StudentRepository;

import jakarta.transaction.Transactional;
@Service
public class StudentService {
	@Autowired
	private CourseRepository courseRepository;
	@Autowired 
	private StudentRepository studentRepository;
	 public Student addStudent(StudentRequestDTO studentDto) {
	        Student student = new Student();
	        student.setFirstName(studentDto.getFirstName());
	        student.setLastName(studentDto.getLastName());
	        student.setEmail(studentDto.getEmail());
	        student.setPhone(studentDto.getPhone());
	        student.setAddress(studentDto.getAddress());
	        student.setPassword(studentDto.getPassword());
	        
	        if (studentDto.getCourseIds() != null && !studentDto.getCourseIds().isEmpty()) {
	            List<Course> courses = courseRepository.findAllById(studentDto.getCourseIds());
	            student.setCourses(courses);
	        }
	        
	        return studentRepository.save(student);
	    }
	 
	 
	 
	 public Optional<Student> validateLogin(String email, String password) {
	        return studentRepository.findByEmailAndPassword(email, password);
	        
	    }
	 
	 
	 @Transactional
	    public List<Course> getEnrolledCourses(String email) {
	        Student student = studentRepository.findByEmail(email);
	        if (student == null) return List.of();
	        return student.getCourses(); 
	    }
	    
	    @Transactional
	    public Student updateStudent(StudentRequestDTO studentDto) {
	        Optional<Student> studentOpt = studentRepository.findById(studentDto.getId());
	        if (studentOpt.isEmpty()) {
	            throw new RuntimeException("Student not found");
	        }
	        
	        Student student = studentOpt.get();
	        student.setFirstName(studentDto.getFirstName());
	        student.setLastName(studentDto.getLastName());
	        student.setEmail(studentDto.getEmail());
	        student.setPhone(studentDto.getPhone());
	        student.setAddress(studentDto.getAddress());
	        
	        // Update courses if provided
	        if (studentDto.getCourseIds() != null && !studentDto.getCourseIds().isEmpty()) {
	            List<Course> courses = courseRepository.findAllById(studentDto.getCourseIds());
	            student.setCourses(courses);
	        } else {
	            // Clear courses if no courseIds provided
	            student.setCourses(List.of());
	        }
	        
	        return studentRepository.save(student);
	    }
}
