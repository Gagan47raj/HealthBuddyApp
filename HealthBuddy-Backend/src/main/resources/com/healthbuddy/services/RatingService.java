package com.healthbuddy.services;

import java.util.List;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Rating;
import com.healthbuddy.model.User;
import com.healthbuddy.request.RatingRequest;

public interface RatingService {
	public Rating createRating(RatingRequest ratingRequest, User user) throws ProductException;
	public List<Rating> getProductsRating(Long productId);
	
}
