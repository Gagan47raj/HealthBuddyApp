package com.healthbuddy.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description", length = 1000)
	private String description;
	
	@Column(name="price")
	private int price;
	
	@Column(name = "discounted_price")
	private int discountedPrice;
	
	@Column(name="discount_percent")
	private int discountPercent;
	
	@Column(name="quantity")
	private int quantity;
	
	@Column(name = "brand")
	private String brand;
	

	
	@Column
	private String imageUrl;
	
	@OneToMany(mappedBy = "product",cascade=CascadeType.ALL,orphanRemoval=true)
	private List<Rating> rating = new ArrayList<>(); 
	
	@OneToMany(mappedBy = "product",cascade=CascadeType.ALL,orphanRemoval=true)
	private List<Review> review = new ArrayList<>();
	
	@Column(name = "numRating")
	private int numRating;
	
	@ManyToOne()
	@JoinColumn(name="category_id")
	private Category category;
	
	@Column(name = "severity")
	private String severity;
	
	@Column(name = "medicine_type")
	private String medicineType;
	
	private LocalDateTime createdAt; 
	
	@ManyToOne
	@JoinColumn(name="size_id")
	private Sizes sizes;
	
	
}