package com.healthbuddy.services;

import com.healthbuddy.exceptions.CartItemException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.CartItem;
import com.healthbuddy.model.Product;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
	
    public CartItem isCartItemsEmpty(Cart cart, Product product, String size, Long userId);
    
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;
    
    public CartItem findCartItemById(Long cartItemId) throws CartItemException;
}
