package com.healthbuddy.services;


import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.User;
import com.healthbuddy.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);
	public String addToCart(Long userId, AddItemRequest addItemRequest) throws ProductException;
	public Cart findUserCart(Long userId);
}
