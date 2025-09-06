package com.iqquestlearning.be.models;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerResponseDTO {
	private Long id;
    private String name;
    private String email;
    private String phone;
    private String specialization;
    private int experience;
    private boolean active;
public Long getId() {
	return id;
}
public void setId(Long id)
{
	this.id=id;
}
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
