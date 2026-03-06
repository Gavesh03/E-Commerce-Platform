package com.computershop.service;

import com.computershop.model.User;
import com.computershop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Register new user
    public User register(User user) {
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Set default role if not specified
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        
        // In production, you should hash the password here
        // For simplicity, we're storing it as plain text (NOT RECOMMENDED for production)
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }
    
    // Login user
    public User login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid username or password");
        }
        
        User user = userOptional.get();
        
        // In production, you should compare hashed passwords
        // For simplicity, we're comparing plain text (NOT RECOMMENDED for production)
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }
        
        return user;
    }
    
    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // Check if user is admin
    public boolean isAdmin(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && "ADMIN".equals(user.get().getRole());
    }
}