package com.iqquestlearning.be.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Attendance;
import com.iqquestlearning.be.repository.AttendanceRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping("/student")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@RequestParam String email) {
        List<Attendance> attendance = attendanceRepository.findByStudentEmail(email);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAttendanceStats(@RequestParam String email) {
        Long present = attendanceRepository.countPresentByStudentEmail(email);
        Long absent = attendanceRepository.countAbsentByStudentEmail(email);
        Long total = attendanceRepository.countTotalByStudentEmail(email);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("present", present != null ? present : 0);
        stats.put("absent", absent != null ? absent : 0);
        stats.put("total", total != null ? total : 0);
        stats.put("percentage", total > 0 ? (present * 100.0 / total) : 0.0);
        
        return ResponseEntity.ok(stats);
    }
}