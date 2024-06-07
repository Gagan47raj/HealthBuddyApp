package com.healthbuddy.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.model.OrderItem;
import com.healthbuddy.repository.OrderItemRepo;
import com.healthbuddy.services.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService {

	@Autowired
	private OrderItemRepo orderItemRepo;
	
	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		return orderItemRepo.save(orderItem);
	}

}
