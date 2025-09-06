package com.iqquestlearning.be.models;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Builder


public class CourseRequestDTO {
	private Long id;
	@NotNull(message = "is required")
	@Size(min=1,max=30,message = "is required")
	private String name;
	/*
	 * private LocalDateTime created_on; private UUID created_by; private
	 * LocalDateTime modified_on; private UUID modified_by;
	 */
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
        return name;
    }
    
    public void setName(String name) {
    	this.name = name;
    }

	/*
	 * public LocalDateTime getCreated_on() { // TODO Auto-generated method stub
	 * return null; }
	 * 
	 * public LocalDateTime getModified_on() { // TODO Auto-generated method stub
	 * return null; }
	 */
}
