package com.healthbuddy.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Product;
import com.healthbuddy.request.CreateProductRequest;

public interface ProductService {

	public Product createProduct(CreateProductRequest request);
	public String deleteProduct(Long productId) throws ProductException;
	public Product updateProduct(Long productId, Product request) throws ProductException;
	public Product findProductById(Long productId) throws ProductException;
	public List<Product> findByCategory(String category) throws ProductException;
	public Page<Product> getAllProducts(
			String category, 
			Integer minPrice, 
			Integer maxPrice, 
			Integer minDiscount, 
			String sortBy, 
			String stock, 
			Integer pageNumber, 
			Integer pageSize) throws ProductException;
	public List<Product> findAllProducts() throws ProductException;
}
