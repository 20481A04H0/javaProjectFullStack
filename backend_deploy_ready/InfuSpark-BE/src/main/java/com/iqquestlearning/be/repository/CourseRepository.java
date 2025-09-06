package com.iqquestlearning.be.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iqquestlearning.be.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	List<Course> findAllByOrderByIdAsc();
}


