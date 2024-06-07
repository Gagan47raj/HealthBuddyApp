package com.healthbuddy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.ApiResponse;
import com.healthbuddy.exceptions.OrderException;
import com.healthbuddy.model.Order;
import com.healthbuddy.services.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping("/")
	public ResponseEntity<List<Order>> getAllOrdersHandler() {
		List<Order> orders = orderService.getAllOrders();
		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Order> confirmOrderHandler(
			@PathVariable Long orderId, @RequestHeader("Authorization")String jwt)throws OrderException {
		Order orders = orderService.confirmedOrder(orderId);
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Order> shipOrderHandler(
			@PathVariable Long orderId, @RequestHeader("Authorization")String jwt)throws OrderException {
		Order orders = orderService.shippedOrder(orderId);
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
}
	
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Order> deliverOrderHandler(
			@PathVariable Long orderId, @RequestHeader("Authorization")String jwt)throws OrderException {
		Order orders = orderService.deliveredOrder(orderId);
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> cancelOrderHandler(
			@PathVariable Long orderId, @RequestHeader("Authorization")String jwt)throws OrderException {
		Order orders = orderService.cancelledOrder(orderId);
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
}
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderHandler(
			@PathVariable Long orderId, @RequestHeader("Authorization")String jwt)throws OrderException {
	
		orderService.deleteOrder(orderId);
		
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Order deleted successfully");
		apiResponse.setStatus(true);
		
		return new ResponseEntity<>(apiResponse, HttpStatus.OK);
}
	
}	
