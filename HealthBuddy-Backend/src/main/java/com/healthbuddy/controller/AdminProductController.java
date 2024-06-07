package com.healthbuddy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbuddy.config.ApiResponse;
import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Product;
import com.healthbuddy.request.CreateProductRequest;
import com.healthbuddy.services.ProductService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

	@Autowired
	public ProductService productService;
	
	@PostMapping	("/")
	public ResponseEntity<Product>createProduct(@RequestBody CreateProductRequest request) {
		Product product = productService.createProduct(request);
		return new ResponseEntity<Product>(product,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {
		productService.deleteProduct(productId);
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Product deleted successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAllProducts() throws ProductException{
		List<Product> products = productService.findAllProducts();
		return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
	}
	
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct( @RequestBody Product request,@PathVariable  Long productId) throws ProductException{
		Product product = productService.updateProduct(productId, request);
		return new ResponseEntity<Product>(product,HttpStatus.CREATED);
	}
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProducts(@RequestBody CreateProductRequest[] request) {
		for(CreateProductRequest createProductRequest : request) {
			productService.createProduct(createProductRequest);
		}
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Products created successfully");
		apiResponse.setStatus(true);
		return new ResponseEntity<>(apiResponse,HttpStatus.CREATED);
	}
}
