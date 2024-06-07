package com.healthbuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Product;
import com.healthbuddy.services.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public ResponseEntity<Page<Product>> findProductByCategoryHandler(
			@RequestParam String category, 
			@RequestParam Integer minPrice,
			@RequestParam Integer maxPrice,
			@RequestParam Integer minDiscount,
			@RequestParam String sortBy,
			@RequestParam String severity,
			@RequestParam String medicineType,
			@RequestParam String stock,
			@RequestParam Integer pageNumber,
			@RequestParam Integer pageSize,
			@RequestParam(defaultValue = "") String searchKey) throws ProductException
	{
		Page<Product> res = productService.getAllProducts(category, minPrice, maxPrice, minDiscount, sortBy,severity,medicineType ,stock, pageNumber, pageSize, searchKey);
		System.out.printf("Complete Product :  %d", res.getSize() - 1);
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/product/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(
		@PathVariable Long productId) throws ProductException
	{
		Product product = productService.findProductById(productId);
		return new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);
	}
	
}