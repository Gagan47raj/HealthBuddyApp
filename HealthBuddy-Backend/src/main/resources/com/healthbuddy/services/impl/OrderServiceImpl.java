package com.healthbuddy.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.OrderException;
import com.healthbuddy.model.Address;
import com.healthbuddy.model.Order;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.CartRepo;
import com.healthbuddy.services.CartItemService;
import com.healthbuddy.services.OrderService;
import com.healthbuddy.services.ProductService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private CartItemService cardItemService;
	@Autowired
	private ProductService productService;
	
	@Override
	public Order createOrder(User user, Address address) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order cancelledOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Order> getAllOrders() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		// TODO Auto-generated method stub
		
	}

}
