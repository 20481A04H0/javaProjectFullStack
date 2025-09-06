package com.iqquestlearning.be.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iqquestlearning.be.entity.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {

	

	List<Trainer> findAllByOrderByIdAsc();
	
	    List<Trainer> findByNameIn(List<String> names);
	
}
