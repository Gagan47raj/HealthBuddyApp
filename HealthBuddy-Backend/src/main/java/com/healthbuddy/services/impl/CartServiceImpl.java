package com.healthbuddy.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.CartItem;
import com.healthbuddy.model.Product;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.CartRepo;
import com.healthbuddy.request.AddItemRequest;
import com.healthbuddy.services.CartItemService;
import com.healthbuddy.services.CartService;
import com.healthbuddy.services.ProductService;
import com.healthbuddy.services.UserService;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartRepo cartRepo;
	@Autowired
	private CartItemService cartItemService; 
	@Autowired
	private ProductService productService;
	@Autowired
	private UserService userService;
	
	
	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		return cartRepo.save(cart);
	}

	@Override
	public String addToCart(Long userId, AddItemRequest addItemRequest) throws ProductException {
		Cart cart = cartRepo.findByUserId(userId);
		Product product = productService.findProductById(addItemRequest.getProductId());
		CartItem cartItem = cartItemService.isCartItemsEmpty(cart, product, addItemRequest.getSize(), userId);//check there	
		
		if(cartItem == null) {
			CartItem newCartItem = new CartItem();
			newCartItem.setProduct(product);
			newCartItem.setCart(cart);
			newCartItem.setQuantity(addItemRequest.getQuantity());
			newCartItem.setUserId(userId);
			
			int price = addItemRequest.getQuantity() * product.getDiscountedPrice();
			newCartItem.setPrice(price);
			newCartItem.setSize(addItemRequest.getSize());
			
			CartItem createdCartItem = cartItemService.createCartItem(newCartItem);
			cart.getCartItems().add(createdCartItem);
		}
		return "Item added to cart";
	}

	@Override
	public Cart findUserCart(Long userId) throws UserException {
	    Cart cart = cartRepo.findByUserId(userId);
	    
//	    if (cart != null) { // Check if cart is not null
	        int totalPrice = 0;
	        int totalItem = 0;
	        int totalDiscountedPrice = 0;
	        
	        for (CartItem item : cart.getCartItems()) {
	            totalPrice += item.getPrice();
	            totalItem += item.getQuantity();
	            totalDiscountedPrice += item.getDiscountedPrice();
	        }
	        
	        cart.setTotalPrice(totalPrice);
	        cart.setTotalItem(totalItem);
	        cart.setTotalDiscountedPrice(totalDiscountedPrice); 
	        cart.setDiscount(totalPrice - totalDiscountedPrice);
//	    } else {
//	        // If cart is null, create a new cart for the user
//	        User user = userService.findUserById(userId); // You may need to implement this method
//	        if (user != null) {
//	            cart = createCart(user);
//	        }
//	    }
	    
	    return cartRepo.save(cart);
	}
}
