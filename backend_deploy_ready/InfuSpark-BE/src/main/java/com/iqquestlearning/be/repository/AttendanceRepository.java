package com.iqquestlearning.be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.iqquestlearning.be.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    List<Attendance> findByStudentId(Long studentId);
    
    List<Attendance> findByStudentEmail(String email);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.email = :email AND a.status = 'Present'")
    Long countPresentByStudentEmail(@Param("email") String email);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.email = :email AND a.status = 'Absent'")
    Long countAbsentByStudentEmail(@Param("email") String email);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.email = :email")
    Long countTotalByStudentEmail(@Param("email") String email);
}