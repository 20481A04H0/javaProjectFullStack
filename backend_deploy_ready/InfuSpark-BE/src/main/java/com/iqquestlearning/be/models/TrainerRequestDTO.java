package com.iqquestlearning.be.models;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TrainerRequestDTO {

    @NotBlank(message = "Name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain only letters")
    private String name;

    @Email(
    	    message = "Enter a valid email",
    	    regexp = "^[\\w!#$%&'*+/=?`{|}~^.-]+@(gmail\\.com|outlook\\.com|infuspark\\.com|yahoo\\.com)$"
    	)
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be exactly 10 digits")
    private String phone;

    @NotBlank(message = "Specialization is required")
    @Pattern(regexp = "^[A-Za-z. ]+$", message = "Specialization must contain only letters")
    private String specialization;

    @Min(value = 1, message = "Experience must be at least 1 year")
    @Max(value = 50, message = "Experience must be less than or equal to 50")
    private int experience;

	public boolean active;


}
