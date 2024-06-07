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
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.healthbuddy.exceptions.ProductException;
import com.healthbuddy.model.Category;
import com.healthbuddy.model.Product;
import com.healthbuddy.model.Sizes;
import com.healthbuddy.repository.CategoryRepo;
import com.healthbuddy.repository.ProductRepo;
import com.healthbuddy.repository.SizesRepo;
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
	@Autowired
	private SizesRepo sizesRepo;
	
	@Override
	public Product createProduct(CreateProductRequest request) {
		System.out.println("Received request: " + request.getSize());
		Category category = categoryRepo.findByName(request.getCategory());
		
		if(category == null)
		{
			category = new Category();
			category.setName(request.getCategory());
			category = categoryRepo.save(category);
		}
		
		Sizes sizes = sizesRepo.findBySize(request.getSize());
		if(sizes == null)
		{
			sizes = new Sizes();
			sizes.setSize(request.getSize());
			sizes = sizesRepo.save(sizes);
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
		product.setCategory(category);
		product.setSeverity(request.getSeverity());
		product.setMedicineType(request.getMedicineType());
	    product.setCreatedAt(LocalDateTime.now());
	    product.setSizes(sizes);
	    
	    Product savedProduct = productRepo.save(product);
	    
	return savedProduct;	
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product = findProductById(productId);
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
			Integer minDiscount, String severity, String medicineType ,String sortBy, String stock, Integer pageNumber, Integer pageSize, String searchKey)
			throws ProductException {
		
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		
        List<Product> products;
//		List<Product> products = productRepo.filterProducts(category, minPrice, maxPrice, minDiscount,severity,medicineType ,sortBy);
		
        if (!searchKey.isEmpty()) {
            Page<Product> searchResults = (Page<Product>) productRepo.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
            products = searchResults.getContent();
        } else {
            products = productRepo.filterProducts(category, minPrice, maxPrice, minDiscount, severity, medicineType, sortBy);
        }

		
		
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
//		Page<Product> page = new PageImpl<>(pageContent, pageable, products.size());
		
//        redisTemplate.opsForValue().set(cacheKey, page, 10, TimeUnit.MINUTES);
		return new PageImpl<>(pageContent, pageable, products.size());
	}

	@Override
	public List<Product> findAllProducts() throws ProductException {
		return productRepo.findAll();
	}
}

	
