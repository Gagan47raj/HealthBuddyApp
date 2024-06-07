package com.healthbuddy.services.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.OrderException;
import com.healthbuddy.exceptions.UserException;
import com.healthbuddy.model.Address;
import com.healthbuddy.model.Cart;
import com.healthbuddy.model.CartItem;
import com.healthbuddy.model.Order;
import com.healthbuddy.model.OrderItem;
import com.healthbuddy.model.User;
import com.healthbuddy.repository.AddressRepo;
import com.healthbuddy.repository.OrderItemRepo;
import com.healthbuddy.repository.OrderRepo;
import com.healthbuddy.repository.UserRepo;
import com.healthbuddy.services.CartService;
import com.healthbuddy.services.OrderItemService;
import com.healthbuddy.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepo orderRepo;
	@Autowired
	private CartService cartService;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private AddressRepo addressRepo;
	@Autowired
	private OrderItemService orderItemService;
	@Autowired
	private OrderItemRepo orderItemRepo;
	
	@Override
	public Order createOrder(User user, Address address) throws UserException  {
		address.setUser(user);
		Address shippedAddress = addressRepo.save(address);
		user.getAddress().add(shippedAddress);
		userRepo.save(user);
		
		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList<>();
		
		for(CartItem cartItem : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setPrice((int) cartItem.getPrice());
			orderItem.setUserId(cartItem.getUserId());
			orderItem.setDiscountedPrice((int) cartItem.getDiscountedPrice());
			
			OrderItem createdOrderItem = orderItemRepo.save(orderItem);
			orderItems.add(createdOrderItem); 
		}
		
		Order order = new Order();
		order.setUser(user);
		order.setOrderItems(orderItems);
		order.setAddress(shippedAddress);
		order.setOrderStatus("PENDING");
		order.setTotalPrice(cart.getTotalPrice());
		order.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		order.setTotalItem(cart.getTotalItem());
		order.setDiscount(cart.getDiscount());
		order.setTotalItem(cart.getTotalItem());
		order.setOrderDate(LocalDateTime.now());
		order.getPaymentDetail().setStatus("Pending");
		
		Order savedOrder = orderRepo.save(order);
		
		for(OrderItem Item : orderItems) {
			Item.setOrder(savedOrder);
			orderItemRepo.save(Item);
		}
		
		return savedOrder;
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> opt = orderRepo.findById(orderId);
		if(opt.isPresent())
		{
			return opt.get();
		}
		throw new OrderException("Order Not Found : "+orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		return orderRepo.findByUserId(userId);
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("PLACED");
		order.getPaymentDetail().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepo.save(order);
	}

	@Override
	public Order cancelledOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		return orderRepo.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepo.save(order);
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepo.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		orderRepo.deleteById(orderId);
	}

}
