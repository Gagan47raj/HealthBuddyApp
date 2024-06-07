package com.healthbuddy.model;

import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "user_id",nullable = false)
	private User user;
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL,orphanRemoval = true)
	@Column(name = "cart_items")
	private Set<CartItem> cartItems = new HashSet<>();
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@Column(name = "total_item")
	private int totalItem;
	
	private int totalDiscountedPrice;
	
	private int discount;
}
