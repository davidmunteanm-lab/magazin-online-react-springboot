package com.shop.backend.service;

import com.shop.backend.model.Product;
import com.shop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 1️⃣ Get all products, optional filtering by name or price range
    public List<Product> getAllProducts(String name, Double minPrice, Double maxPrice) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(name);
        } else if (minPrice != null && maxPrice != null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice);
        }
        return productRepository.findAll();
    }

    // 2️⃣ Create a new product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // 3️⃣ Optional: find by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // 4️⃣ Optional: delete a product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // 5️⃣ Optional: update a product
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setCategory(updatedProduct.getCategory());
            product.setSubcategory(updatedProduct.getSubcategory());
            product.setSellerName(updatedProduct.getSellerName());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());
            return productRepository.save(product);
        }).orElse(null);
    }
}
