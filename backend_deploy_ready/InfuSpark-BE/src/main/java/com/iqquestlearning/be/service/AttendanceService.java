package com.iqquestlearning.be.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class AttendanceService {
    
    public InputStream getStudentsFileInputStream() throws Exception {
        try {
            // Try to load from classpath first (for production)
            ClassPathResource resource = new ClassPathResource("uploads/students.xlsx");
            if (resource.exists()) {
                return resource.getInputStream();
            }
        } catch (Exception e) {
            // Fallback - this will be handled by the controller
            throw new Exception("Students file not found in classpath");
        }
        throw new Exception("Students file not found");
    }
}