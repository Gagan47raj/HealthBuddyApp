package com.healthbuddy.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Product;
import com.healthbuddy.model.Rating;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.RatingRepository;
import com.healthbuddy.request.RatingRequest;
import com.healthbuddy.services.ProductService;
import com.healthbuddy.services.RatingService;

@Service
public class RatingServiceImpl implements RatingService {

	@Autowired
	private RatingRepository ratingRepository;
	@Autowired
	private ProductService productService;
	
	@Override
	public Rating createRating(RatingRequest ratingRequest, User user) throws ProductException {
		Product product = productService.findProductById(ratingRequest.getProductId());
		Rating rating = new Rating();
		rating.setProduct(product);
		rating.setUser(user);
		rating.setRating(ratingRequest.getRating());
		rating.setCreatedOn(LocalDate.now());
		
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductsRating(Long productId) {
		
		return ratingRepository.getAllProductsRating(productId);
	}

}
