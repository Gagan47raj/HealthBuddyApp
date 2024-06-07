package com.healthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthbuddy.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
	public User findByEmail(String email);
}
