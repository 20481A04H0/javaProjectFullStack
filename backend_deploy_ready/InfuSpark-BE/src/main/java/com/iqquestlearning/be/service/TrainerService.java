package com.iqquestlearning.be.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iqquestlearning.be.entity.Trainer;
import com.iqquestlearning.be.models.TrainerRequestDTO;
import com.iqquestlearning.be.models.TrainerResponseDTO;
import com.iqquestlearning.be.repository.TrainerRepository;

import jakarta.transaction.Transactional;
@Service
public class TrainerService {
@Autowired
    private TrainerRepository trainerRepository;
    public void addTrainer(TrainerRequestDTO trainerDto) {
        Trainer trainer = new Trainer();
        trainer.setName(trainerDto.getName());
        trainer.setEmail(trainerDto.getEmail());
        trainer.setPhone(trainerDto.getPhone());
        trainer.setExpertise(trainerDto.getSpecialization());
        trainer.setExperience(trainerDto.getExperience());
        trainer.setActive(true);
        trainerRepository.save(trainer);
    }
    public List<TrainerResponseDTO> getAllTrainers() {
    	 List<Trainer> trainers = trainerRepository.findAllByOrderByIdAsc();
	       List<TrainerResponseDTO> trainerResponseDTOs = new ArrayList<>(); 
			/* return trainerRepository.findAll(); */
	       for(Trainer trainer:trainers)
	       {
	    	   TrainerResponseDTO dto=new TrainerResponseDTO();
	    	   dto.setId(trainer.getId());
	    	   dto.setName(trainer.getName());
	    	   dto.setEmail(trainer.getEmail());
	    	   dto.setPhone(trainer.getPhone());
	    	   dto.setExperience(trainer.getExperience());
	    	   dto.setSpecialization(trainer.getExpertise());
	    	   dto.setActive(trainer.getActive());
	    	   trainerResponseDTOs.add(dto);
	       }
	       return trainerResponseDTOs;
    }
    public void deleteTrainerById(Long id) {
        Optional<Trainer> trainer = trainerRepository.findById(id);
        if (trainer.isPresent()) {
            trainerRepository.deleteById(id);
        } else {
            throw new RuntimeException("Trainer with ID " + id + " not found.");
        }
    }
    @Transactional
    public void deleteTrainerByIdFromCourse(Long trainerId) {
        trainerRepository.deleteById(trainerId);
    }
}
