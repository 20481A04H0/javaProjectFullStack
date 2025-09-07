package com.iqquestlearning.be.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Admin;
import com.iqquestlearning.be.entity.Course;
import com.iqquestlearning.be.entity.Student;
import com.iqquestlearning.be.entity.Trainer;
import com.iqquestlearning.be.repository.AdminLoginRepository;
import com.iqquestlearning.be.repository.CourseRepository;
import com.iqquestlearning.be.repository.StudentRepository;
import com.iqquestlearning.be.repository.TrainerRepository;

@Service
public class InitializationService implements CommandLineRunner {

    @Autowired
    private AdminLoginRepository adminRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting data initialization...");
        
        // Initialize admin if not exists
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setName("System Admin");
            admin.setEmail("admin@infuspark.com");
            admin.setPassword("admin123");
            admin.setPhone("1234567890");
            adminRepository.save(admin);
            System.out.println("Admin created");
        }
        
        // Initialize courses if not exists
        if (courseRepository.count() == 0) {
            String[] courseNames = {
                "Java Full Stack Development",
                "Python Development", 
                "Azure Data Engineering",
                "AWS Cloud Architecture",
                "Data Engineering with Spark",
                "GCP Microservices"
            };
            
            for (String courseName : courseNames) {
                Course course = new Course();
                course.setName(courseName);
                courseRepository.save(course);
            }
            System.out.println("Courses created: " + courseNames.length);
        }
        
        // Initialize trainers if not exists
        if (trainerRepository.count() == 0) {
            String[][] trainers = {
                {"John Smith", "john.smith@infuspark.com", "9876543210", "Python, Django, React", "5"},
                {"Sarah Johnson", "sarah.johnson@infuspark.com", "9876543211", "Java, Spring Boot, Angular", "7"},
                {"Mike Davis", "mike.davis@infuspark.com", "9876543212", "Azure, Databricks, Spark", "6"},
                {"Lisa Wilson", "lisa.wilson@infuspark.com", "9876543213", "AWS, DevOps, Cloud Architecture", "8"},
                {"David Brown", "david.brown@infuspark.com", "9876543214", "Data Engineering, ETL, Big Data", "4"},
                {"Emma Taylor", "emma.taylor@infuspark.com", "9876543215", "GCP, Kubernetes, Microservices", "6"}
            };
            
            for (String[] trainerData : trainers) {
                Trainer trainer = new Trainer();
                trainer.setName(trainerData[0]);
                trainer.setEmail(trainerData[1]);
                trainer.setPhone(trainerData[2]);
                trainer.setExpertise(trainerData[3]);
                trainer.setExperience(Integer.parseInt(trainerData[4]));
                trainer.setActive(true);
                trainerRepository.save(trainer);
            }
            System.out.println("Trainers created: " + trainers.length);
        }
        
        // Initialize students if not exists
        if (studentRepository.count() == 0) {
            String[][] students = {
                {"John", "Doe", "john.doe@student.com", "9876543210", "123 Main St", "password123"},
                {"Jane", "Smith", "jane.smith@student.com", "9876543211", "456 Oak Ave", "password123"},
                {"Mike", "Johnson", "mike.johnson@student.com", "9876543212", "789 Pine Rd", "password123"},
                {"Sarah", "Wilson", "sarah.wilson@student.com", "9876543213", "321 Elm St", "password123"},
                {"David", "Brown", "david.brown@student.com", "9876543214", "654 Maple Dr", "password123"}
            };
            
            for (String[] studentData : students) {
                Student student = new Student();
                student.setFirstName(studentData[0]);
                student.setLastName(studentData[1]);
                student.setEmail(studentData[2]);
                student.setPhone(studentData[3]);
                student.setAddress(studentData[4]);
                student.setPassword(studentData[5]);
                studentRepository.save(student);
            }
            System.out.println("Students created: " + students.length);
        }
        
        System.out.println("Data initialization completed!");
        System.out.println("Admin count: " + adminRepository.count());
        System.out.println("Course count: " + courseRepository.count());
        System.out.println("Trainer count: " + trainerRepository.count());
        System.out.println("Student count: " + studentRepository.count());
    }
}