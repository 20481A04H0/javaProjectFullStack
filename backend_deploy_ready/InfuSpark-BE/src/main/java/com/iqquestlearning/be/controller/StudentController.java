package com.iqquestlearning.be.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Student;
import com.iqquestlearning.be.models.StudentRequestDTO;
import com.iqquestlearning.be.repository.StudentRepository;
import com.iqquestlearning.be.service.StudentService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/student")
public class StudentController {
	@Autowired
	private StudentService studentService;
	@Autowired
	private StudentRepository studentRepository;
	
	@PostMapping(value = "/addStudent", consumes = {"application/json", "text/plain"})  
    public ResponseEntity<?> addStuddent(@Valid @RequestBody StudentRequestDTO student, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);  
        }

        try {
            Student savedStudent = studentService.addStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error adding student: " + e.getMessage()));
        }
    }
	
	@GetMapping("/getStudentsCount")
	public ResponseEntity<Long> getStudentsCount() {
	    long count = studentRepository.count();
	    return ResponseEntity.ok(count);
	}
	
	@GetMapping("/test")
	public ResponseEntity<?> test() {
	    return ResponseEntity.ok(Map.of("message", "API is working", "timestamp", System.currentTimeMillis()));
	}
	@PostMapping(value = "/studentLogin", consumes = {"application/json", "text/plain"})
	public ResponseEntity<?> login(@RequestBody StudentRequestDTO studentRequestDTO) {
	    Optional<Student> optionalStudent = studentService.validateLogin(
	        studentRequestDTO.getEmail(), 
	        studentRequestDTO.getPassword()
	    );

	    if (optionalStudent.isPresent()) {
	        Student student = optionalStudent.get();
	        Map<String, Object> response = Map.of(
	            "message", "Login successful",
	            "student", Map.of(
	                "name", student.getFirstName(),
	                "email", student.getEmail(),
	                "phone", student.getPhone()  
	            )
	            
	        );
	        System.out.println("LOGIN: name=" + student.getFirstName() + ", email=" + student.getEmail() + ", phone=" + student.getPhone());

	        return ResponseEntity.ok(response);
	    } else {
	        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
	    }
	}
	@GetMapping("/getEnrolledCourses")
	public ResponseEntity<?> getEnrolledCourses(@RequestParam String email) {
	    try {
	        List<Course> courses = studentService.getEnrolledCourses(email);
	        return ResponseEntity.ok(courses);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body(Map.of("error", "Something went wrong"));
	    }
	}

	
	@GetMapping("/getAllStudents")
	public List<Student> getAllStudents() {
	    // Return full student objects with courses included
	    return studentRepository.findAll();
	}

	
	 // --- Get student by ID (for update) ---
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isPresent()) {
            // Return full student object with courses included
            return ResponseEntity.ok(studentOpt.get());
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Student not found"));
        }
    }
    
    
    @PutMapping("/update")
    public ResponseEntity<?> updateStudent(@RequestBody StudentRequestDTO dto) {
        try {
            Student updatedStudent = studentService.updateStudent(dto);
            return ResponseEntity.ok(updatedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("message", "Student not found"));
        }
        studentRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Student deleted!"));
    }
}
