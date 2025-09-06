package com.iqquestlearning.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Home {
    
    @GetMapping("/")
    public String index() {
        return "forward:/HomePage.html";
    }
    
    @GetMapping("/home")
    public String home() {
        return "forward:/HomePage.html";
    }
    
    @GetMapping("/admin")
    public String adminLogin() {
        return "forward:/AdminLogin.html";
    }
    
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "forward:/AdminDashBoard.html";
    }
    
    @GetMapping("/student/login")
    public String studentLogin() {
        return "forward:/student/student-login.html";
    }
    
    @GetMapping("/student/dashboard")
    public String studentDashboard() {
        return "forward:/student/StudentDashBoard.html";
    }
    
    @GetMapping("/student/register")
    public String studentRegister() {
        return "forward:/student/StudentRegistration.html";
    }
    
    @GetMapping("/about")
    public String about() {
        return "forward:/AboutUs.html";
    }
    
    @GetMapping("/services")
    public String services() {
        return "forward:/Services.html";
    }
    
    @GetMapping("/courses")
    public String courses() {
        return "forward:/CoursesList.html";
    }
}
