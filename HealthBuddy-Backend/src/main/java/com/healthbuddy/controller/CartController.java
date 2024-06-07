package com.healthbuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.ApiResponse;
import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.User;
import com.healthbuddy.request.AddItemRequest;
import com.healthbuddy.services.CartService;
import com.healthbuddy.services.UserService;

@RestController
@RequestMapping("/api/cart")
//@Tag(name = "Cart Management", description="find user cart, add item to cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public ResponseEntity<Cart>findUserCart(@RequestHeader("Authorization")String jwt) throws UserException
	{
		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());
		
		return new ResponseEntity<Cart>(cart, HttpStatus.OK);
	}
	
	@PutMapping("/add")
	public ResponseEntity<ApiResponse>addItemToCart(
			@RequestBody AddItemRequest req, 
			@RequestHeader("Authorization")String jwt)throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		cartService.addToCart(user.getId(), req);
		ApiResponse res = new ApiResponse();
		res.setMessage("item added to cart");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
}
