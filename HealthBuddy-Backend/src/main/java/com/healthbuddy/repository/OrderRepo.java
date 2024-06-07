package com.healthbuddy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthbuddy.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

	@Query("Select o From Order o Where o.user.id = :userId And (o.orderStatus = 'PLACED' Or o.orderStatus = 'CONFIRMED' Or o.orderStatus = 'SHIPPED' Or o.orderStatus = 'DELIVERED')")
	public List<Order> getUsersOrders(@Param("userId") Long userId);

	public List<Order> findByUserId(Long userId);
}
