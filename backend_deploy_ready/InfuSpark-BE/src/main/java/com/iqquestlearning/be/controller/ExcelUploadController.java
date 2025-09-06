package com.iqquestlearning.be.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iqquestlearning.be.service.AttendanceService;
@RestController
@RequestMapping("/api/studentExcel")
@CrossOrigin(origins = "*") 
public class ExcelUploadController {

    private final String uploadDir = System.getProperty("java.io.tmpdir") + File.separator + "uploads";

    private final AttendanceService attendanceService;
    // Simple in-memory cache to demo - use a persistent store/db in prod
    private Map<String, Map<String, String>> cachedAttendanceMap = new HashMap<>();

    public ExcelUploadController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please choose a file to upload.");
        }

        try {
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            String newFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destFile = new File(directory, newFileName);

            file.transferTo(destFile);

            // For now, just acknowledge the upload
            // TODO: Implement Excel parsing if needed
            cachedAttendanceMap.clear();

            return ResponseEntity.ok("File uploaded and parsed successfully! Saved as: " + newFileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to upload or parse file: " + e.getMessage());
        }
    }

    // Expose this map through API for frontend to get attendance by email
    @GetMapping("/attendanceByEmail")
    public ResponseEntity<?> getAttendanceByEmail(@RequestParam String email) {
        Map<String, String> studentAttendance = cachedAttendanceMap.get(email);
        if (studentAttendance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Attendance data not found for: " + email);
        }

        // Build List of date/status maps for JSON response, sorted by date
        List<Map<String, String>> attendanceList = new ArrayList<>();
        studentAttendance.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .forEach(entry -> {
                attendanceList.add(Map.of("date", entry.getKey(), "status", entry.getValue()));
            });

        return ResponseEntity.ok(Map.of("attendance", attendanceList));
    }
}