// API Configuration
const API_URL = 'http://localhost:8080/api/products';

// Product Data - will be loaded from backend
let products = [];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productCount = document.getElementById('productCount');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const continueShopping = document.getElementById('continueShopping');
const filterTabs = document.querySelectorAll('.filter-tab');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const searchBtn = document.querySelector('.search-btn');
const searchModal = document.getElementById('searchModal');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Load Products from Backend
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        products = await response.json();
        console.log('Loaded products:', products);
        renderProducts(products);
    } catch (error) {
        console.warn('Error loading products using API, loading sample data for demo:', error);

        // Sample data for demonstration/fallback
        products = [
            {
                id: 1,
                name: "MacBook Pro 14 M3",
                brand: "Apple",
                category: "Laptops",
                price: 580000,
                originalPrice: 650000,
                description: "The new MacBook Pro with M3 chip delivers amazing performance.",
                imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=600",
                inStock: true,
                badge: "New"
            },
            {
                id: 2,
                name: "Dell XPS 15",
                brand: "Dell",
                category: "Laptops",
                price: 450000,
                description: "Performance and portability in one sleek package.",
                imageUrl: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=600",
                inStock: true,
                badge: "Hot"
            },
            {
                id: 3,
                name: "Sony WH-1000XM5",
                brand: "Sony",
                category: "Audio",
                price: 135000,
                description: "Industry-leading noise cancellation.",
                imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
                inStock: true,
                badge: "Sale"
            },
            {
                id: 4,
                name: "Logitech MX Master 3S",
                brand: "Logitech",
                category: "Peripherals",
                price: 35000,
                description: "The ultimate productivity mouse.",
                imageUrl: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=600",
                inStock: true,
                badge: null
            },
            {
                id: 5,
                name: "ASUS ROG Strix",
                brand: "ASUS",
                category: "Laptops",
                price: 320000,
                description: "Powerful gaming laptop for enthusiasts.",
                imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600",
                inStock: false,
                badge: null
            },
            {
                id: 6,
                name: "Samsung Odyssey G9",
                brand: "Samsung",
                category: "Peripherals",
                price: 450000,
                description: "49-inch curved gaming monitor.",
                imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
                inStock: true,
                badge: "Hot"
            }
        ];

        renderProducts(products);
        // We need to reload filters because they depend on products
        loadBrandFilters();
    }
}

// Format Price
function formatPrice(price) {
    return 'LKR ' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Products
function renderProducts(productsToRender) {
    const filteredProducts = productsToRender || products;

    // Update product count
    if (productCount) {
        productCount.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} available`;
    }

    if (filteredProducts.length === 0) {
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #6b6b6b;">
                    <p>No products found with current filters</p>
                </div>
            `;
        }
        return;
    }

    if (productsGrid) {
        productsGrid.innerHTML = filteredProducts.map((product, index) => `
            <div class="product-card" style="animation-delay: ${index * 0.1}s">
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge ${!product.inStock ? 'out-of-stock' : ''}">${product.inStock ? product.badge : 'Out of Stock'}</span>` : ''}
                    ${!product.badge && !product.inStock ? '<span class="product-badge out-of-stock">Out of Stock</span>' : ''}
                    <img src="${product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}" 
                         alt="${product.name}" 
                         loading="lazy"
                         onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                    <div class="product-buttons">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? 'Add to Cart' : 'Sold Out'}
                        </button>
                        <button class="more-details-btn" onclick="showProductDetails(${product.id})">
                            More Details
                        </button>
                    </div>
                </div>
                <p class="product-category">${product.category}</p>
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
            </div>
        `).join('');
    }
}

// Show Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.innerHTML = `
        <div class="product-modal">
            <button class="modal-close-btn" onclick="closeProductModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                </svg>
            </button>
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}" 
                         alt="${product.name}"
                         onerror="this.src='https://via.placeholder.com/600x600?text=No+Image'">
                </div>
                <div class="product-modal-info">
                    ${product.badge ? `<span class="modal-badge">${product.badge}</span>` : ''}
                    <p class="modal-category">${product.category}</p>
                    <p class="modal-brand">${product.brand}</p>
                    <h2 class="modal-title">${product.name}</h2>
                    <div class="modal-price">
                        <span class="modal-current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="modal-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="modal-description">
                        <h3>Product Description</h3>
                        <p>${product.description || 'No description available.'}</p>
                    </div>
                    <div class="modal-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                        ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </div>
                    <button class="modal-add-to-cart" onclick="addToCart(${product.id}); closeProductModal();" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
}

// Close Product Details Modal
function closeProductModal() {
    const modal = document.querySelector('.product-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    openCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Update Cart UI
function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartBadge.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
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
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Open Cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Cart
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Open Search
function openSearch() {
    searchModal.classList.add('active');
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
}

// Close Search
function closeSearchModal() {
    searchModal.classList.remove('active');
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    document.body.style.overflow = '';
}

// Search Products (searches name, brand, category, description)
function searchProducts(query) {
    if (!query.trim()) {
        searchResults.innerHTML = '';
        return;
    }

    const results = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; color: #6b6b6b; padding: 20px;">No products found</p>';
        return;
    }

    searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="selectSearchResult(${product.id})">
            <div class="search-result-image">
                <img src="${product.imageUrl || 'https://via.placeholder.com/60x60'}" 
                     alt="${product.name}"
                     onerror="this.src='https://via.placeholder.com/60x60'">
            </div>
            <div class="search-result-info">
                <p class="search-result-brand">${product.brand}</p>
                <h4>${product.name}</h4>
                <p>${formatPrice(product.price)}</p>
            </div>
        </div>
    `).join('');
}

// Select Search Result
function selectSearchResult(productId) {
    closeSearchModal();
    showProductDetails(productId);
}

// Filter Products
function filterProducts(category) {
    filterTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    activeFilters.categories = [category];
    applyFilters();
}

// Event Listeners
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);
continueShopping.addEventListener('click', closeCartSidebar);

searchBtn?.addEventListener('click', openSearch);
closeSearch?.addEventListener('click', closeSearchModal);
searchOverlay?.addEventListener('click', closeSearchModal);
searchInput?.addEventListener('input', (e) => searchProducts(e.target.value));

mobileMenuBtn?.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterProducts(tab.dataset.category);
    });
});

// Keyboard Events
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCartSidebar();
        closeSearchModal();
        closeProductModal();
    }
});

// Filter state
let activeFilters = {
    categories: ['all'],
    brands: [],
    priceRanges: [],
    stockStatus: ['in-stock'],
    badges: []
};

// Initialize filters after products load
async function initializeFilters() {
    await loadProducts();
    loadBrandFilters();
    setupFilterListeners();
    applyFilters();
}

// Load dynamic brand filters based on products
function loadBrandFilters() {
    if (!products || products.length === 0) return;

    // Sort brands alphabetically
    const brands = [...new Set(products.map(p => p.brand))].sort();
    const brandFiltersContainer = document.getElementById('brandFilters');

    if (brandFiltersContainer) {
        brandFiltersContainer.innerHTML = brands.map(brand => `
            <label class="filter-checkbox">
                <input type="checkbox" name="brand" value="${brand}">
                <span>${brand}</span>
            </label>
        `).join('');
    }
}

// Setup filter event listeners
function setupFilterListeners() {
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.value === 'all') {
                if (e.target.checked) {
                    activeFilters.categories = ['all'];
                    document.querySelectorAll('input[name="category"]').forEach(cb => {
                        if (cb.value !== 'all') cb.checked = false;
                    });
                }
            } else {
                if (e.target.checked) {
                    activeFilters.categories = activeFilters.categories.filter(c => c !== 'all');
                    document.querySelector('input[name="category"][value="all"]').checked = false;
                    if (!activeFilters.categories.includes(e.target.value)) {
                        activeFilters.categories.push(e.target.value);
                    }
                } else {
                    activeFilters.categories = activeFilters.categories.filter(c => c !== e.target.value);
                    if (activeFilters.categories.length === 0) {
                        activeFilters.categories = ['all'];
                        document.querySelector('input[name="category"][value="all"]').checked = true;
                    }
                }
            }
            applyFilters();
        });
    });

    // Brand filters
    document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.brands.push(e.target.value);
            } else {
                activeFilters.brands = activeFilters.brands.filter(b => b !== e.target.value);
            }
            applyFilters();
        });
    });

    // Price range filters
    document.querySelectorAll('input[name="price"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.priceRanges.push(e.target.value);
            } else {
                activeFilters.priceRanges = activeFilters.priceRanges.filter(p => p !== e.target.value);
            }
            applyFilters();
        });
    });

    // Stock status filters
    document.querySelectorAll('input[name="stock"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.stockStatus.push(e.target.value);
            } else {
                activeFilters.stockStatus = activeFilters.stockStatus.filter(s => s !== e.target.value);
            }
            applyFilters();
        });
    });

    // Badge filters
    document.querySelectorAll('input[name="badge"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.badges.push(e.target.value);
            } else {
                activeFilters.badges = activeFilters.badges.filter(b => b !== e.target.value);
            }
            applyFilters();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyFilters();
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Filter toggle (mobile)
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filtersPanel = document.getElementById('filtersPanel');
    if (filterToggleBtn && filtersPanel) {
        filterToggleBtn.addEventListener('click', () => {
            filtersPanel.classList.toggle('active');
        });
    }

    // Apply filters button (mobile)
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            const filtersPanel = document.getElementById('filtersPanel');
            if (filtersPanel) {
                filtersPanel.classList.remove('active');
            }
        });
    }
}

// Apply all active filters
function applyFilters() {
    let filtered = [...products];

    // Filter by category
    if (!activeFilters.categories.includes('all')) {
        filtered = filtered.filter(p => activeFilters.categories.includes(p.category.toLowerCase()) || activeFilters.categories.includes(p.category));
    }

    // Filter by brand
    if (activeFilters.brands.length > 0) {
        filtered = filtered.filter(p => activeFilters.brands.includes(p.brand));
    }

    // Filter by price range
    if (activeFilters.priceRanges.length > 0) {
        filtered = filtered.filter(p => {
            return activeFilters.priceRanges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return p.price >= min && p.price <= max;
            });
        });
    }

    // Filter by stock status
    if (activeFilters.stockStatus.length > 0) {
        filtered = filtered.filter(p => {
            const inStock = p.inStock;
            return (activeFilters.stockStatus.includes('in-stock') && inStock) ||
                (activeFilters.stockStatus.includes('out-of-stock') && !inStock);
        });
    }

    // Filter by badge
    if (activeFilters.badges.length > 0) {
        filtered = filtered.filter(p => p.badge && activeFilters.badges.includes(p.badge));
    }

    // Apply sorting
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    filtered = sortProducts(filtered, sortValue);

    // Update display
    renderProducts(filtered);
    updateActiveFiltersDisplay();
    updateFilterCount();
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-az':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-za':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

// Update active filters display
function updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    if (!activeFiltersContainer) return;

    const tags = [];

    // Category tags
    if (!activeFilters.categories.includes('all')) {
        activeFilters.categories.forEach(cat => {
            tags.push({ type: 'category', value: cat, label: cat });
        });
    }

    // Brand tags
    activeFilters.brands.forEach(brand => {
        tags.push({ type: 'brand', value: brand, label: brand });
    });

    // Price range tags
    activeFilters.priceRanges.forEach(range => {
        const [min, max] = range.split('-');
        const label = max === '99999999'
            ? `Over ${formatPrice(parseInt(min))}`
            : `${formatPrice(parseInt(min))} - ${formatPrice(parseInt(max))}`;
        tags.push({ type: 'price', value: range, label });
    });

    // Badge tags
    activeFilters.badges.forEach(badge => {
        const icon = badge === 'Sale' ? '🏷️' : badge === 'New' ? '✨' : '🔥';
        tags.push({ type: 'badge', value: badge, label: `${icon} ${badge}` });
    });

    if (tags.length === 0) {
        activeFiltersContainer.innerHTML = '';
        return;
    }

    activeFiltersContainer.innerHTML = tags.map(tag => `
        <div class="filter-tag">
            ${tag.label}
            <button onclick="removeFilter('${tag.type}', '${tag.value}')">×</button>
        </div>
    `).join('');
}

// Remove individual filter
function removeFilter(type, value) {
    switch (type) {
        case 'category':
            activeFilters.categories = activeFilters.categories.filter(c => c !== value);
            if (activeFilters.categories.length === 0) {
                activeFilters.categories = ['all'];
                document.querySelector('input[name="category"][value="all"]').checked = true;
            }
            document.querySelector(`input[name="category"][value="${value}"]`).checked = false;
            break;
        case 'brand':
            activeFilters.brands = activeFilters.brands.filter(b => b !== value);
            document.querySelector(`input[name="brand"][value="${value}"]`).checked = false;
            break;
        case 'price':
            activeFilters.priceRanges = activeFilters.priceRanges.filter(p => p !== value);
            document.querySelector(`input[name="price"][value="${value}"]`).checked = false;
            break;
        case 'badge':
            activeFilters.badges = activeFilters.badges.filter(b => b !== value);
            document.querySelector(`input[name="badge"][value="${value}"]`).checked = false;
            break;
    }
    applyFilters();
}

// Clear all filters
function clearAllFilters() {
    // Reset filter state
    activeFilters = {
        categories: ['all'],
        brands: [],
        priceRanges: [],
        stockStatus: ['in-stock'],
        badges: []
    };

    // Uncheck all checkboxes
    document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Check default options
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.querySelector('input[name="stock"][value="in-stock"]').checked = true;

    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';

    applyFilters();
}

// Update filter count
function updateFilterCount() {
    const count =
        (activeFilters.categories.includes('all') ? 0 : activeFilters.categories.length) +
        activeFilters.brands.length +
        activeFilters.priceRanges.length +
        activeFilters.badges.length;

    const filterCountElement = document.getElementById('filterCount');
    if (filterCountElement) {
        filterCountElement.textContent = count;
        filterCountElement.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

document.querySelector('.icon-btn[aria-label="Account"]')?.addEventListener('click', () => {
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = 'account.html';
    } else {
        window.location.href = 'login.html';
    }
});

// Remove existing click listener for cart button in script.js if it exists to avoid conflicts or double binding, 
// though usually safe. However, we'll ensure the element exists.
if (cartBtn) {
    cartBtn.removeEventListener('click', openCart); // Just in case
    cartBtn.addEventListener('click', openCart);
}



// Checkout redirect
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
});

// Initialize
//loadProducts();
initializeFilters();
updateCart();