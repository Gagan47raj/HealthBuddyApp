package com.healthbuddy.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Category;
import com.healthbuddy.model.Product;
import com.healthbuddy.repository.CategoryRepo;
import com.healthbuddy.repository.ProductRepo;
import com.healthbuddy.request.CreateProductRequest;
import com.healthbuddy.services.ProductService;
import com.healthbuddy.services.UserService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private UserService userService;
	
	@Override
	public Product createProduct(CreateProductRequest request) {
		Category firstLevel = categoryRepo.findByName(request.getFirstCategory());
		
		if(firstLevel == null)
		{
			Category firstCategory = new Category();
			firstCategory.setName(request.getFirstCategory());
			firstCategory.setLevel(1);
			
			firstLevel = categoryRepo.save(firstCategory);
		}
		
		Category secondLevel = categoryRepo.findByNameAndParent(request.getSecondCategory(),firstLevel.getName());
		if(secondLevel == null)
		{
			Category secondCategory = new Category();
			secondCategory.setName(request.getSecondCategory());
			secondCategory.setParentCategory(firstLevel);
		    secondCategory.setLevel(2);
		    
		    secondCategory = categoryRepo.save(secondCategory);
		}
		
		Category thirdLevel = categoryRepo.findByNameAndParent(request.getThirdCategory(),secondLevel.getName());
		if(thirdLevel == null)
		{
			Category thirdCategory = new Category();
			thirdCategory.setName(request.getThirdCategory());
			thirdCategory.setParentCategory(secondLevel);
		    thirdCategory.setLevel(3);
		    
		    thirdCategory = categoryRepo.save(thirdCategory);
	}
		Product product = new Product();
		product.setName(request.getName());
		product.setDescription(request.getDescription());
		product.setPrice(request.getPrice());
		product.setDiscountedPrice(request.getDiscountedPrice());
		product.setDiscountPercent(request.getDiscountPercent());
		product.setQuantity(request.getQuantity());
		product.setBrand(request.getBrand());
		product.setImageUrl(request.getImageUrl());
		product.setCategory(thirdLevel);
		product.setVols(request.getVols());
	    product.setCreatedAt(LocalDateTime.now());
	    
	    Product savedProduct = productRepo.save(product);
	    
	return savedProduct;	
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product = findProductById(productId);
		product.getVols().clear();
		productRepo.delete(product);
		return "Product Deleted Successfully";
	}

	@Override
	public Product updateProduct(Long productId, Product request) throws ProductException {
		Product product = findProductById(productId);
		
		if(request.getQuantity() != 0)
		{
			product.setQuantity(request.getQuantity());
		}
		return productRepo.save(product);
	}

	@Override
	public Product findProductById(Long productId) throws ProductException {
	    Optional<Product> opt = productRepo.findById(productId);
	    if(opt.isPresent())
	    {
	    	return opt.get();
	    }
		throw new ProductException("Product Not Found"+productId);
	}

	@Override
	public List<Product> findByCategory(String category) throws ProductException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Product> getAllProducts(String category, Integer minPrice, Integer maxPrice,
			Integer minDiscount, String sortBy, String stock, Integer pageNumber, Integer pageSize)
			throws ProductException {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		List<Product> products = productRepo.filterProducts(category, minPrice, maxPrice, minDiscount, sortBy);
		
		if(stock != null)
		{
			if(stock.equals("in_stock"))
			{
				products = products.stream().filter(p -> p.getQuantity() > 0).collect(Collectors.toList());
			}
			else if(stock.equals("out_of_stock"))
			{
				products = products.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
			}
		}
		
		int startIndex = (int)pageable.getOffset();
		int endIndex = Math.min((startIndex + pageable.getPageSize()), products.size());
		List<Product> pageContent = products.subList(startIndex, endIndex);
		Page<Product> page = new PageImpl<>(pageContent, pageable, products.size());
		return page;
	}

	@Override
	public List<Product> findAllProducts() throws ProductException {
		return productRepo.findAll();
	}

	
}
