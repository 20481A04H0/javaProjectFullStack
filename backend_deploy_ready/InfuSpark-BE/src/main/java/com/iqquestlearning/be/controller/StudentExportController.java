package com.iqquestlearning.be.controller;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Student;
import com.iqquestlearning.be.repository.StudentRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController

@RequestMapping("/api/studentExcel")
@CrossOrigin(origins = "*") 
public class StudentExportController {
	private final StudentRepository studentRepository;

    @Autowired
    public StudentExportController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    @GetMapping("/export-students")
    public void exportStudentDetails(HttpServletResponse response) throws Exception {
      
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

        List<Student> students = studentRepository.findAll() ; 

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Students");

    
        Row header = sheet.createRow(0);
        String[] columns = {"ID", "Address", "Email", "First Name", "Last Name", "Password", "Phone"};
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        
        int rowIdx = 1;
        for (Student s : students) {
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(s.getId());
            row.createCell(1).setCellValue(s.getAddress());
            row.createCell(2).setCellValue(s.getEmail());
            row.createCell(3).setCellValue(s.getFirstName());
            row.createCell(4).setCellValue(s.getLastName());
            row.createCell(5).setCellValue(s.getPassword());
            row.createCell(6).setCellValue(s.getPhone());
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }
}

