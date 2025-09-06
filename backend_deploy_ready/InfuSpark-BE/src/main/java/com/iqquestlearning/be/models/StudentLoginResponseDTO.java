package com.iqquestlearning.be.models;

import lombok.Data;

@Data
public class StudentLoginResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    public StudentLoginResponseDTO(String firstName, String lastName, String email, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}
