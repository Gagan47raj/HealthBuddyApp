package com.healthbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.healthbuddy.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

	@Transactional
	void deleteByProductId(Long productId);

}
