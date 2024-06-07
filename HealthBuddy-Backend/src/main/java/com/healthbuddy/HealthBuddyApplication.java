package com.healthbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableCaching
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HealthBuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthBuddyApplication.class, args);
	}

}
