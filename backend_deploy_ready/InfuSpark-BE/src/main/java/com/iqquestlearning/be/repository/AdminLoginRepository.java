package com.iqquestlearning.be.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iqquestlearning.be.entity.Admin;

@Repository
public interface AdminLoginRepository extends JpaRepository<Admin, Long> {
	Optional<Admin> findByEmailAndPassword(String email, String password);
}


