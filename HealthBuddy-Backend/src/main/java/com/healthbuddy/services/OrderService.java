package com.healthbuddy.services;

import java.util.List;

import com.healthbuddy.exceptions.OrderException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Address;
import com.healthbuddy.model.Order;
import com.healthbuddy.model.User;

public interface OrderService {
 
	public Order createOrder(User user, Address address) throws UserException;
	
	public Order findOrderById(Long orderId) throws OrderException;
	
	public List<Order> usersOrderHistory(Long userId);
	
	public Order placedOrder(Long orderId) throws OrderException;
	
	public Order confirmedOrder(Long orderId) throws OrderException;
	
	public Order cancelledOrder(Long orderId) throws OrderException;
	
	public Order deliveredOrder(Long orderId) throws OrderException;
	
	public Order shippedOrder(Long orderId) throws OrderException;
	
	public List<Order>getAllOrders();

	public void deleteOrder(Long orderId) throws OrderException;
}
