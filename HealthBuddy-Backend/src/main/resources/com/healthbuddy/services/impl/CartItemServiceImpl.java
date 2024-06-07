package com.healthbuddy.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.CartItemException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.CartItem;
import com.healthbuddy.model.Product;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.CartItemRepo;
import com.healthbuddy.repository.CartRepo;
import com.healthbuddy.services.CartItemService;
import com.healthbuddy.services.UserService;

@Service
public class CartItemServiceImpl implements CartItemService {
	
	@Autowired
	private CartItemRepo cartItemRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CartRepo cartRepo;

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		cartItem.setQuantity(1);	
		cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
		cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
		
		CartItem createdCartItem = cartItemRepo.save(cartItem);
		return createdCartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
		CartItem item = findCartItemById(id);
		User user = userService.findUserById(item.getUserId());
		
		if(user.getId().equals(userId))
		{
			item.setQuantity(cartItem.getQuantity());
			item.setPrice(item.getProduct().getPrice() * item.getQuantity());
			item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
		}
		
		return cartItemRepo.save(item);
	}

	@Override
	public CartItem isCartItemsEmpty(Cart cart, Product product, String size, Long userId) {
		CartItem cartItem = cartItemRepo.isCartItemsEmpty(cart, product, userId);
		return cartItem;
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
		CartItem item = findCartItemById(cartItemId);
		User user = userService.findUserById(item.getUserId());
		
		User reqUser = userService.findUserById(userId);
		
		if(user.getId().equals(reqUser.getId()))
		{
			cartItemRepo.deleteById(cartItemId);
		}else
		{
			throw new UserException("You cant remove item another users item : "+userId);
		}
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
		if(opt.isPresent())
		{
			return opt.get();
		}
			throw new CartItemException("Cart Item Not Found : "+cartItemId);		
	}

}
