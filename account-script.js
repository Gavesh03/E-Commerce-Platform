// Check if user is logged in
let currentUser = null;

window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupNavigationListeners();
    loadCartCount();
    checkUrlParams();
    renderAccountCart();
});

// Check authentication
function checkAuth() {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    currentUser = JSON.parse(userStr);
    displayUserInfo();
}

// Display user information
function displayUserInfo() {
    // Sidebar
    document.getElementById('userName').textContent = `Welcome, ${currentUser.fullName || currentUser.username}!`;
    document.getElementById('userEmail').textContent = currentUser.email;

    // Profile form
    document.getElementById('fullName').value = currentUser.fullName || '';
    document.getElementById('username').value = currentUser.username;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('role').value = currentUser.role === 'ADMIN' ? 'Administrator' : 'Customer';
}

// Setup navigation listeners
function setupNavigationListeners() {
    const navLinks = document.querySelectorAll('.account-nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.section);
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Password form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
}

function switchTab(sectionName) {
    const navLinks = document.querySelectorAll('.account-nav-link');

    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));

    // Add active class to clicked link
    const activeLink = document.querySelector(`.account-nav-link[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Hide all content sections
    document.querySelectorAll('.account-content').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const sectionId = sectionName + '-section';
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}

// Check URL parameters for section redirection
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
        switchTab(section);
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();
    alert('Password change functionality coming soon!');
}

// Load cart count for header
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = count;
    }
}

// Format Price
function formatPrice(price) {
    return 'LKR ' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Cart Logic
function renderAccountCart() {
    const cartItemsContainer = document.getElementById('accountCartItems');
    const cartTotalElement = document.getElementById('accountCartTotal');

    if (!cartItemsContainer || !cartTotalElement) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update badge as well
    loadCartCount();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Browse our products and find something you like!</p>
                <a href="index.html#products" class="btn-shop" style="margin-top: 20px;">Start Shopping</a>
            </div>
        `;
        cartTotalElement.textContent = 'LKR 0.00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = formatPrice(total);

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.imageUrl || 'https://via.placeholder.com/80x80'}" 
                     alt="${item.name}"
                     onerror="this.src='https://via.placeholder.com/80x80'">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-brand">${item.brand}</p>
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateAccountCartQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateAccountCartQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromAccountCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Global functions for inline onclick handlers
window.updateAccountCartQuantity = function (productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderAccountCart();
    }
};

window.removeFromAccountCart = function (productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderAccountCart();
};