package com.healthbuddy.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Product;
import com.healthbuddy.model.Review;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.ProductRepo;
import com.healthbuddy.repository.ReviewRepo;
import com.healthbuddy.request.ReviewRequest;
import com.healthbuddy.services.ProductService;
import com.healthbuddy.services.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;
    
    @Autowired
    private ProductRepo productRepo;
    
    @Autowired
    private ProductService productService;

    @Override
    public Review createReview(ReviewRequest reviewRequest, User user) throws ProductException {
        Product product = productService.findProductById(reviewRequest.getProductId());
        
        if (product == null) {
            throw new ProductException("Product not found with ID: " + reviewRequest.getProductId());
        }
        
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(reviewRequest.getReview());
        review.setCreatedAt(LocalDateTime.now());
        
        return reviewRepo.save(review);
    }

	@Override
	public List<Review> getAllReview(Long productId) {
		return reviewRepo.getAllProductsReviews(productId);
	}

    
}
