package com.healthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthbuddy.model.Cart;
import com.healthbuddy.model.CartItem;
import com.healthbuddy.model.Product;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
	
	@Query("Select ci From CartItem ci Where ci.cart=:cart And ci.product=:product And ci.size=:size And ci.userId=:userId")
	public CartItem isCartItemsEmpty(
			@Param("cart") Cart cart,
			@Param("product") Product product,
			@Param("size") String size,
			@Param("userId") Long userId); 
}
