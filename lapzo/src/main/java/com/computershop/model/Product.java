package com.computershop.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(name = "original_price")
    private Double originalPrice;
    
    @Column(length = 2000)
    private String description;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private String badge;
    
    @Column(name = "in_stock")
    private Boolean inStock;
    
    // Default Constructor
    public Product() {
        this.inStock = true; // Default to in stock
    }
    
    // Constructor with all fields
    public Product(Long id, String name, String category, String brand, Double price, 
                   Double originalPrice, String description, String imageUrl, String badge, Boolean inStock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.description = description;
        this.imageUrl = imageUrl;
        this.badge = badge;
        this.inStock = inStock;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Double getOriginalPrice() {
        return originalPrice;
    }
    
    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getBadge() {
        return badge;
    }
    
    public void setBadge(String badge) {
        this.badge = badge;
    }
    
    public Boolean getInStock() {
        return inStock;
    }
    
    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }
    
    // toString method
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", brand='" + brand + '\'' +
                ", price=" + price +
                ", originalPrice=" + originalPrice +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", badge='" + badge + '\'' +
                ", inStock=" + inStock +
                '}';
    }
}