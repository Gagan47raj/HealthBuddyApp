package com.healthbuddy.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductRequest {
	private String name;
	private String description;
	private int price;
	private int discountedPrice;
	private int discountPercent;
	private int quantity;
	private String brand;
	private String imageUrl;
	
	private String category;
	private String severity;
	private String medicineType;
	private String size;
}
