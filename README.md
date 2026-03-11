# E-Commerce-Platform
🛒 Lapzo - E-Commerce Web Application
Name : S.H.G.Mithila
Index Number : FC221013
A full-stack e-commerce web application for selling computers, laptops, and tech products. Built with Spring Boot backend and vanilla JavaScript frontend.
________________________________________
🎯 Overview
Lapzo is a modern e-commerce platform designed for selling computer hardware and electronics. The application features a RESTful backend API built with Spring Boot, connected to a MySQL database, and a responsive frontend built with HTML, CSS, and vanilla JavaScript.
Key Highlights:
•	Full CRUD Operations for product management
•	Role-based Access Control (Admin & User)
•	Session-based Authentication with localStorage
•	Responsive Design for mobile and desktop
•	Advanced Filtering by brand, price, category
•	Shopping Cart with localStorage persistence
•	Admin Dashboard for product management
________________________________________
✨ Features
For Customers:
•	✅ Browse products with advanced filters (brand, price range, category)
•	✅ Search products by name, brand, or specifications
•	✅ View detailed product information with specifications
•	✅ Add/remove items from shopping cart
•	✅ Update product quantities in cart
•	✅ User registration and authentication
•	✅ User profile management
•	✅ Checkout process with order summary
•	✅ Responsive design for all devices
For Administrators:
•	✅ Secure admin dashboard
•	✅ Add new products with detailed specifications
•	✅ Edit existing product information
•	✅ Delete products from inventory
•	✅ View all products in a table format
•	✅ Search and filter products
•	✅ Manage product stock status
•	✅ Set product badges (Sale, New, Hot)
•	✅ View order management (upcoming feature)
________________________________________
🔐 Authentication Endpoints
Register User
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "USER"
}

Response: 200 OK
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER",
  "fullName": "John Doe",
  "message": "Registration successful"
}

Error Response: 400 Bad Request
{
  "error": "Username already exists"
}
Login
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "password": "password123"
}

Response: 200 OK
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER",
  "fullName": "John Doe",
  "message": "Login successful"
}

Error Response: 401 Unauthorized
{
  "error": "Invalid username or password"
}
Get User by ID
GET /api/auth/user/{id}
Example: GET /api/auth/user/1
________________________________________
📦 Product Endpoints
Get All Products
GET /api/products

Get Product by ID
GET /api/products/{id}
Example: GET /api/products/1

Get Products by Category
GET /api/products/category/{category}
Example: GET /api/products/category/laptops

Get Products by Brand
GET /api/products/brand/{brand}
Example: GET /api/products/brand/Apple

Search Products
GET /api/products/search?query={searchTerm}
Example: GET /api/products/search?query=macbook

Description: Searches products by name, brand, category, and description
Create Product (Admin Only)
POST /api/products
Request Body:
{
  "name": "Dell XPS 15",
  "category": "laptops",
  "brand": "Dell",
  "price": 625000.00,
  "originalPrice": 695000.00,
  "description": "Intel Core i7\n16GB RAM\n512GB SSD",
  "imageUrl": "images/products/dell-xps.jpg",
  "badge": "Sale",
  "inStock": true
}

Response: 201 Created
{
  "id": 15,
  "name": "Dell XPS 15",
  "category": "laptops",
  ...
}

Update Product (Admin Only)
PUT /api/products/{id}
Example: PUT /api/products/1

Request Body:
{
  "name": "MacBook Pro 16\" M3 Max - Updated",
  "category": "laptops",
  "brand": "Apple",
  "price": 850000.00,
  "originalPrice": 999000.00,
  "description": "Updated description",
  "imageUrl": "images/products/macbook-new.jpg",
  "badge": "Hot",
  "inStock": true
}

Response: 200 OK
{
  "id": 1,
  "name": "MacBook Pro 16\" M3 Max - Updated",
  ...
}

Error Response: 404 Not Found

Delete Product (Admin Only)
DELETE /api/products/{id}
Example: DELETE /api/products/1
________________________________________
👤 User Endpoints
Get All Users (Admin Only)
GET /api/users

Get User Profile
GET /api/users/{id}
Example: GET /api/users/2

Update User Profile
PUT /api/users/{id}

Delete User Account
DELETE /api/users/{id}
Example: DELETE /api/users/2
________________________________________
🛒 Cart Endpoints
Get User Cart
GET /api/cart/{userId}
Example: GET /api/cart/2

Add Item to Cart
POST /api/cart/add

Update Cart Item Quantity
PUT /api/cart/update

Remove Item from Cart
DELETE /api/cart/remove

Clear Cart
DELETE /api/cart/clear/{userId}
Example: DELETE /api/cart/clear/2
________________________________________
📋 Order Endpoints
Create Order
POST /api/orders

Get User Orders
GET /api/orders/user/{userId}
Example: GET /api/orders/user/2

Get Order by ID
GET /api/orders/{orderId}
Example: GET /api/orders/ORD-2024-001

Get All Orders (Admin Only)
GET /api/orders

Update Order Status (Admin Only)
PUT /api/orders/{orderId}/status

Cancel Order
PUT /api/orders/{orderId}/cancel
Example: PUT /api/orders/ORD-2024-001/cancel
________________________________________
👥 User Roles
1. ADMIN
Permissions:
•	✅ Full access to admin dashboard
•	✅ Create, Read, Update, Delete products
•	✅ View all users
•	✅ View all orders
•	✅ Update order status
•	✅ Manage inventory
•	✅ Access shop as a regular user
2. USER
Permissions:
•	✅ Browse and search products
•	✅ Filter products by category, brand, price
•	✅ View product details
•	✅ Add/remove products to cart
•	✅ Update cart quantities
•	✅ Place orders
•	✅ View order history
•	✅ Update profile
•	❌ Cannot access admin dashboard
•	❌ Cannot modify product data
•	❌ Cannot view other users' data
