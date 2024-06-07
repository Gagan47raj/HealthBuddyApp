package com.healthbuddy.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthbuddy.model.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p " +
           "WHERE (:category IS NULL OR p.category.name = :category OR :category = '') " +
           "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
           "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
           "OR (:severity IS NULL OR p.severity = '' OR p.severity = :severity) " +
		   "OR (:medicineType IS NULL OR p.medicineType = '' OR p.medicineType = :medicineType) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
           "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    public List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minDiscount") Integer minDiscount,
            @Param("severity") String severity,
            @Param("medicineType") String medicineType,
            @Param("sort") String sort);
    
    public Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
    		String key1, String key2, Pageable pageable);
};
