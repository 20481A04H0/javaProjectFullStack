package com.iqquestlearning.be.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iqquestlearning.be.entity.Trainer;
import com.iqquestlearning.be.models.TrainerDto;
import com.iqquestlearning.be.models.TrainerRequestDTO;
import com.iqquestlearning.be.models.TrainerResponseDTO;
import com.iqquestlearning.be.repository.TrainerRepository;
import com.iqquestlearning.be.service.TrainerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trainer")
public class TrainerController {
    @Autowired
    private TrainerService trainerService;
    @Autowired
    private TrainerRepository trainerRepository;
    @PostMapping("/addTrainer")  
    public ResponseEntity<?> addTrainer(@Valid @RequestBody TrainerRequestDTO trainer, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> {
                errors.put(error.getField(), error.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);  
        }

        trainerService.addTrainer(trainer);
        return ResponseEntity.ok("Trainer saved successfully");
    }
	
    @GetMapping("/getAllTrainers")
	public ResponseEntity<List<TrainerResponseDTO>> getAllUsers() {
		List<TrainerResponseDTO> trainers = trainerService.getAllTrainers();
		
		if (trainers.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(trainers);
	}
    @GetMapping("/{id}")
	   public ResponseEntity<?> getTrainerById(@PathVariable Long id) {
	       return trainerRepository.findById(id)
	               .map(trainer -> {
	                   TrainerResponseDTO dto = new TrainerResponseDTO();
	                   dto.setId(trainer.getId());
	                   dto.setName(trainer.getName());
	                   dto.setEmail(trainer.getEmail());
	                   dto.setPhone(trainer.getPhone());
	                   dto.setSpecialization(trainer.getExpertise());
	                   dto.setExperience(trainer.getExperience());
	                   dto.setActive(trainer.getActive());
	                   return ResponseEntity.ok(dto);
	               })
	               .orElse(ResponseEntity.notFound().build());
	   }

	   @PutMapping("/update")
	   public ResponseEntity<?> updateTrainer(@RequestBody TrainerRequestDTO trainerDto) {
	       try {
	           trainerService.updateTrainer(trainerDto);
	           return ResponseEntity.ok(Map.of("message", "Trainer updated successfully"));
	       } catch (RuntimeException e) {
	           return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
	       }
	   }
	   @DeleteMapping("/deleteTrainer/{id}")
	   public ResponseEntity<?> deleteTrainer(@PathVariable Long id) {
	       trainerService.deleteTrainerById(id);
	       return ResponseEntity.ok("Trainer deleted successfully");
	   }

	   @GetMapping("/all")
	   public List<TrainerDto> getAllTrainers() {
	       List<Trainer> trainers = trainerRepository.findAll();
	       return trainers.stream()
	    		   .map(t -> new TrainerDto(t.getId(), t.getName()))

	           .collect(Collectors.toList());
	   }
 
	   @DeleteMapping("/{id}")
	   public ResponseEntity<?> deleteTrainerFromCourse(@PathVariable Long id) {
	       trainerService.deleteTrainerByIdFromCourse(id);
	       return ResponseEntity.ok("Trainer deleted successfully");
	   }
 
}
