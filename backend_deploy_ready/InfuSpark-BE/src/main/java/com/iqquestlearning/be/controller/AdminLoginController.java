package com.iqquestlearning.be.controller;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Admin;
import com.iqquestlearning.be.models.AdminRequestDTO;
import com.iqquestlearning.be.service.AdminLoginService;
@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {
    @Autowired
    private AdminLoginService adminService;
    @PostMapping(value = "/login", consumes = {"application/json", "text/plain"})
    public ResponseEntity<?> login(@RequestBody AdminRequestDTO adminRequestDTO) {
        Optional<Admin> optionalAdmin = adminService.validateLogin(
            adminRequestDTO.getEmail(), 
            adminRequestDTO.getPassword()
        );

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            Map<String, Object> response = Map.of(
                "message", "Login successful",
                "admin", Map.of(
                    "name", admin.getName(),
                    "email", admin.getEmail(),
                    "phone", admin.getPhone()
                )
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }
}
