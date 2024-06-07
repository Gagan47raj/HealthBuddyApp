package com.healthbuddy.services;

import java.util.List;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Review;
import com.healthbuddy.model.User;
import com.healthbuddy.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest reviewRequest, User user) throws ProductException;
	public List<Review> getAllReview(Long productId);
}
