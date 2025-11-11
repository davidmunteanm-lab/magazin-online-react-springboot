package com.shop.backend.repository;

import com.shop.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search by name (like search)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Filter by price between two values
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}
