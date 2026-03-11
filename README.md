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
✨ Features<br>
For Customers:<br>
•	✅ Browse products with advanced filters (brand, price range, category)<br>
•	✅ Search products by name, brand, or specifications<br>
•	✅ View detailed product information with specifications<br>
•	✅ Add/remove items from shopping cart<br>
•	✅ Update product quantities in cart<br>
•	✅ User registration and authentication<br>
•	✅ User profile management<br>
•	✅ Checkout process with order summary<br>
•	✅ Responsive design for all devices<br>
For Administrators:<br>
•	✅ Secure admin dashboard<br>
•	✅ Add new products with detailed specifications<br>
•	✅ Edit existing product information<br>
•	✅ Delete products from inventory<br>
•	✅ View all products in a table format<br>
•	✅ Search and filter products<br>
•	✅ Manage product stock status<br>
•	✅ Set product badges (Sale, New, Hot)<br>
•	✅ View order management (upcoming feature)<br>
________________________________________
🔐 Authentication Endpoints<br>
Register User<br>
POST /api/auth/register<br>
Content-Type: application/json<br><br>

Request Body:<br>
{<br>
  "username": "john_doe",<br>
  "email": "john@example.com",<br>
  "password": "password123",<br>
  "fullName": "John Doe",<br>
  "role": "USER"<br>
}<br><br>

Response: 200 OK<br>
{<br>
  "id": 1,<br>
  "username": "john_doe",<br>
  "email": "john@example.com",<br>
  "role": "USER",<br>
  "fullName": "John Doe",<br>
  "message": "Registration successful"<br>
}<br><br>

Error Response: 400 Bad Request<br>
{<br>
  "error": "Username already exists"<br>
}<br>
Login<br>
POST /api/auth/login<br>
Content-Type: application/json<br><br>

Request Body:<br>
{<br>
  "username": "john_doe",<br>
  "password": "password123"<br>
}<br><br>

Response: 200 OK<br>
{<br>
  "id": 1,<br>
  "username": "john_doe",<br>
  "email": "john@example.com",<br>
  "role": "USER",<br>
  "fullName": "John Doe",<br>
  "message": "Login successful"<br>
}<br><br>

Error Response: 401 Unauthorized<br>
{<br>
  "error": "Invalid username or password"<br>
}<br>
Get User by ID<br>
GET /api/auth/user/{id}<br>
Example: GET /api/auth/user/1<br>
________________________________________
📦 Product Endpoints<br>
Get All Products<br>
GET /api/products<br><br>

Get Product by ID<br>
GET /api/products/{id}<br>
Example: GET /api/products/1<br><br>

Get Products by Category<br>
GET /api/products/category/{category}<br>
Example: GET /api/products/category/laptops<br><br>

Get Products by Brand<br>
GET /api/products/brand/{brand}<br>
Example: GET /api/products/brand/Apple<br><br>

Search Products<br>
GET /api/products/search?query={searchTerm}<br>
Example: GET /api/products/search?query=macbook<br><br>

Description: Searches products by name, brand, category, and description<br>
Create Product (Admin Only)<br>
POST /api/products<br>
Request Body:<br>
{<br>
  "name": "Dell XPS 15",<br>
  "category": "laptops",<br>
  "price": 625000.00,<br>
  "originalPrice": 695000.00,<br>
  "description": "Intel Core i7\n16GB RAM\n512GB SSD",<br>
  "imageUrl": "images/products/dell-xps.jpg",<br>
  "badge": "Sale",<br>
  "inStock": true<br>
}<br><br>

Response: 201 Created<br>
{<br>
  "id": 15,<br>
  "name": "Dell XPS 15",<br>
  "category": "laptops",<br>
  ...<br>
}<br>

Update Product (Admin Only)<br>
PUT /api/products/{id}<br>
Example: PUT /api/products/1<br><br>

Request Body:<br>
{<br>
  "name": "MacBook Pro 16\" M3 Max - Updated",<br>
  "category": "laptops",<br>
  "brand": "Apple",<br>
  "price": 850000.00,<br>
  "originalPrice": 999000.00,<br>
  "description": "Updated description",<br>
  "imageUrl": "images/products/macbook-new.jpg",<br>
  "badge": "Hot",<br>
  "inStock": true<br>
}<br><br>

Response: 200 OK<br>
{<br>
  "id": 1,<br>
  "name": "MacBook Pro 16\" M3 Max - Updated",<br>
  ...<br>
}<br><br>

Error Response: 404 Not Found<br><br>

Delete Product (Admin Only)<br>
DELETE /api/products/{id}<br>
Example: DELETE /api/products/1<br>
________________________________________
👤 User Endpoints<br>
Get All Users (Admin Only)<br>
GET /api/users<br><br>

Get User Profile<br>
GET /api/users/{id}<br>
Example: GET /api/users/2<br><br>

Update User Profile<br>
PUT /api/users/{id}<br><br>

Delete User Account<br>
DELETE /api/users/{id}<br>
Example: DELETE /api/users/2<br>
________________________________________
🛒 Cart Endpoints<br>
Get User Cart<br>
GET /api/cart/{userId}<br>
Example: GET /api/cart/2<br><br>

Add Item to Cart<br>
POST /api/cart/add<br><br>

Update Cart Item Quantity<br>
PUT /api/cart/update<br><br>

Remove Item from Cart<br>
DELETE /api/cart/remove<br><br>

Clear Cart<br>
DELETE /api/cart/clear/{userId}<br>
Example: DELETE /api/cart/clear/2<br>
________________________________________
📋 Order Endpoints<br>
Create Order<br>
POST /api/orders<br><br>

Get User Orders<br>
GET /api/orders/user/{userId}<br>
Example: GET /api/orders/user/2<br><br>

Get Order by ID<br>
GET /api/orders/{orderId<br>
Example: GET /api/orders/ORD-2024-001<br><br>

Get All Orders (Admin Only)<br>
GET /api/orders<br><br>

Update Order Status (Admin Only)<br>
PUT /api/orders/{orderId}/status<br><br>

Cancel Order<br>
PUT /api/orders/{orderId}/cancel<br>
Example: PUT /api/orders/ORD-2024-001/cancel<br>
________________________________________
👥 User Roles<br>
1. ADMIN<br>
Permissions:<br>
•	✅ Full access to admin dashboard<br>
•	✅ Create, Read, Update, Delete products<br>
•	✅ View all users<br>
•	✅ View all orders<br>
•	✅ Update order status<br>
•	✅ Manage inventory<br>
•	✅ Access shop as a regular user<br>
2. USER<br>
Permissions:<br>
•	✅ Browse and search products<br>
•	✅ Filter products by category, brand, price<br>
•	✅ View product details<br>
•	✅ Add/remove products to cart<br>
•	✅ Update cart quantities<br>
•	✅ Place orders<br>
•	✅ View order history<br>
•	✅ Update profile<br>
•	❌ Cannot access admin dashboard<br>
•	❌ Cannot modify product data<br>
•	❌ Cannot view other users' data<br>
