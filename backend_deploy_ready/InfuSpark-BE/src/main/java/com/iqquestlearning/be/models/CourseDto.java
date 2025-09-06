package com.iqquestlearning.be.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String name;
    private List<String> trainerNames;

    // ✅ Explicit getters/setters are not needed because @Data already generates them.
    // But if you want them manually, ensure types match (Long not int).

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

    public List<String> getTrainerNames() {
        return trainerNames;
    }

    public void setTrainerNames(List<String> trainerNames) {
        this.trainerNames = trainerNames;
    }
}
