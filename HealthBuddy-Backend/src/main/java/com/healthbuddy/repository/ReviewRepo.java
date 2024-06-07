package com.healthbuddy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.healthbuddy.model.Review;

public interface ReviewRepo extends JpaRepository<Review, Long> {

	@Query("Select r From Review r Where r.product.id=:productId")
	public List<Review> getAllProductsReviews(
			@Param("productId") Long productId);
}
