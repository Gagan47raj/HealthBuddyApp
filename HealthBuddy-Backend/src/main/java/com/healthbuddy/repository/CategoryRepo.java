package com.healthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthbuddy.model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

	Category findByName(String name);
	
}
