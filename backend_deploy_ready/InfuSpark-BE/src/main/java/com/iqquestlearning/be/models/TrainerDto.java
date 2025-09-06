package com.iqquestlearning.be.models;

public class TrainerDto {
    private Long id;
    private String name;

    // No-arg constructor (NEEDED FOR JACKSON)
    public TrainerDto() {
    }

    // All-args constructor
    public TrainerDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters and setters
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
}
