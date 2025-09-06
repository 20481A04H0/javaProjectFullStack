package com.iqquestlearning.be.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Admin;
import com.iqquestlearning.be.repository.AdminLoginRepository;

@Service
public class AdminLoginService {

    @Autowired
    private AdminLoginRepository adminRepository;

    public Optional<Admin> validateLogin(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
        
    }
}


