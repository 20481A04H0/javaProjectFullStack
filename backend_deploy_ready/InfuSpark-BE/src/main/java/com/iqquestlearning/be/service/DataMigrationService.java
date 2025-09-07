package com.iqquestlearning.be.service;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Attendance;
import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Student;
import com.iqquestlearning.be.repository.AttendanceRepository;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.repository.StudentRepository;

@Service
public class DataMigrationService { // implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private AttendanceRepository attendanceRepository;

    // @Override
    // public void run(String... args) throws Exception {
    //     migrateExcelData();
    // }

    public void migrateExcelData() {
        try {
            // Try to load from classpath first
            ClassPathResource resource = new ClassPathResource("uploads/students.xlsx");
            if (resource.exists()) {
                try (InputStream inputStream = resource.getInputStream();
                     Workbook workbook = new XSSFWorkbook(inputStream)) {
                    
                    processExcelFile(workbook);
                }
            } else {
                System.out.println("Excel file not found in classpath, skipping migration");
            }
        } catch (Exception e) {
            System.out.println("Error migrating Excel data: " + e.getMessage());
        }
    }

    private void processExcelFile(Workbook workbook) {
        Sheet sheet = workbook.getSheetAt(0);
        Row headerRow = sheet.getRow(0);
        
        // Find attendance date columns (starting from column 7)
        List<LocalDate> attendanceDates = new ArrayList<>();
        for (int col = 7; col < headerRow.getLastCellNum(); col++) {
            Cell cell = headerRow.getCell(col);
            if (cell != null) {
                String dateStr = getCellValue(cell);
                if (dateStr != null && dateStr.matches("\\d{2}-\\d{2}-\\d{4}")) {
                    try {
                        LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
                        attendanceDates.add(date);
                    } catch (Exception e) {
                        System.out.println("Invalid date format: " + dateStr);
                    }
                }
            }
        }
        
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            
            try {
                String firstName = getCellValue(row.getCell(0));
                String lastName = getCellValue(row.getCell(1));
                String email = getCellValue(row.getCell(2));
                String phone = getCellValue(row.getCell(3));
                String address = getCellValue(row.getCell(4));
                
                if (firstName != null && lastName != null && email != null) {
                    Student student = studentRepository.findByEmail(email);
                    if (student == null) {
                        student = new Student();
                        student.setFirstName(firstName);
                        student.setLastName(lastName);
                        student.setEmail(email);
                        student.setPhone(phone != null ? phone : "0000000000");
                        student.setAddress(address != null ? address : "Not provided");
                        student.setPassword("password123");
                        
                        List<Course> courses = courseRepository.findAll();
                        if (!courses.isEmpty()) {
                            List<Course> studentCourses = new ArrayList<>();
                            studentCourses.add(courses.get(0));
                            student.setCourses(studentCourses);
                        }
                        
                        student = studentRepository.save(student);
                        System.out.println("Migrated student: " + firstName + " " + lastName);
                    }
                    
                    // Process attendance data
                    for (int dateIndex = 0; dateIndex < attendanceDates.size(); dateIndex++) {
                        Cell attendanceCell = row.getCell(7 + dateIndex);
                        if (attendanceCell != null) {
                            String status = getCellValue(attendanceCell);
                            if ("Present".equalsIgnoreCase(status) || "Absent".equalsIgnoreCase(status)) {
                                Attendance attendance = new Attendance();
                                attendance.setStudent(student);
                                attendance.setAttendanceDate(attendanceDates.get(dateIndex));
                                attendance.setStatus(status);
                                attendance.setCourseName("General");
                                attendanceRepository.save(attendance);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("Error processing row " + i + ": " + e.getMessage());
            }
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return null;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return null;
        }
    }
}