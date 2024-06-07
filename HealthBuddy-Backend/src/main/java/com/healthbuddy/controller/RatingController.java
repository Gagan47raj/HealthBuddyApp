package com.healthbuddy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Rating;
import com.healthbuddy.model.User;
import com.healthbuddy.request.RatingRequest;
import com.healthbuddy.services.RatingService;
import com.healthbuddy.services.UserService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

	@Autowired
	private RatingService ratingService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(
		@RequestBody RatingRequest request,
		@RequestHeader("Authorization")String jwt) throws UserException,ProductException
	{
		User user = userService.findUserProfileByJwt(jwt);
		Rating rating = ratingService.createRating(request, user);
		
		return new ResponseEntity<Rating>(rating,HttpStatus.CREATED);
	}
	
	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductsRating(
		@PathVariable Long productId,
		@RequestHeader("Authorization")String jwt
	)throws UserException,ProductException
	{
		User user = userService.findUserProfileByJwt(jwt);
		List<Rating> rating = ratingService.getProductsRating(productId);
		
		return new ResponseEntity<>(rating,HttpStatus.CREATED);
	}
}
