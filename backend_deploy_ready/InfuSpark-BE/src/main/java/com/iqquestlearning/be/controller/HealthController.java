package com.iqquestlearning.be.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.repository.AdminLoginRepository;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.repository.StudentRepository;
import com.iqquestlearning.be.repository.TrainerRepository;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthController {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private TrainerRepository trainerRepository;
    
    @Autowired
    private AdminLoginRepository adminRepository;

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        
        try {
            long studentCount = studentRepository.count();
            health.put("students", studentCount);
        } catch (Exception e) {
            health.put("students", "ERROR: " + e.getMessage());
        }
        
        try {
            long courseCount = courseRepository.count();
            health.put("courses", courseCount);
        } catch (Exception e) {
            health.put("courses", "ERROR: " + e.getMessage());
        }
        
        try {
            long trainerCount = trainerRepository.count();
            health.put("trainers", trainerCount);
        } catch (Exception e) {
            health.put("trainers", "ERROR: " + e.getMessage());
        }
        
        try {
            long adminCount = adminRepository.count();
            health.put("admins", adminCount);
        } catch (Exception e) {
            health.put("admins", "ERROR: " + e.getMessage());
        }
        
        health.put("status", "OK");
        health.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(health);
    }
}