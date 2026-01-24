const API_URL = 'http://localhost:8080/api';

let products = [];
let currentUser = null;
let productToDelete = null;
let isEditMode = false;

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProducts();
});

// Check if user is logged in and is admin
function checkAuth() {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    currentUser = JSON.parse(userStr);

    // Check if user is admin
    if (currentUser.role !== 'ADMIN') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return;
    }

    // Display admin info
    document.getElementById('adminName').textContent = currentUser.fullName || currentUser.username;
    document.getElementById('adminEmail').textContent = currentUser.email;
}

// Logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Load all products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        displayProducts(products);
        updateProductCount();
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Error loading products. Please check if backend is running.');
    }
}

// Display products in table
function displayProducts(productsToDisplay) {
    const tbody = document.getElementById('productsTableBody');

    if (productsToDisplay.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #6b6b6b;">No products found</td></tr>';
        return;
    }

    tbody.innerHTML = productsToDisplay.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>
                <img src="${product.imageUrl || 'https://via.placeholder.com/60'}" 
                     alt="${product.name}" 
                     class="product-image-cell"
                     onerror="this.src='https://via.placeholder.com/60'">
            </td>
            <td><strong>${product.name}</strong></td>
            <td>${product.brand}</td>
            <td><span style="text-transform: capitalize;">${product.category}</span></td>
            <td><strong>LKR ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
            <td>
                <span class="badge ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>
            <td class="actions">
                <button class="btn-icon btn-edit" onclick="editProduct(${product.id})">✏️ Edit</button>
                <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

// Update product count
function updateProductCount() {
    document.getElementById('productCount').textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
}

// Show section
function showSection(sectionName) {
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    if (sectionName === 'products') {
        document.getElementById('products-section').classList.add('active');
        document.getElementById('pageTitle').textContent = 'Products Management';
    } else if (sectionName === 'add-product') {
        document.getElementById('add-product-section').classList.add('active');
        document.getElementById('pageTitle').textContent = 'Add New Product';
        resetForm();
    }
}

// Search products
document.getElementById('searchProducts')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
});

// Filter by category
document.getElementById('filterCategory')?.addEventListener('change', (e) => {
    const category = e.target.value;
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);
    displayProducts(filtered);
});

// Reset form
function resetForm() {
    isEditMode = false;
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('submitBtn').textContent = 'Add Product';
    document.getElementById('productInStock').checked = true;
}

// Product form submission
document.getElementById('productForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: document.getElementById('productOriginalPrice').value
            ? parseFloat(document.getElementById('productOriginalPrice').value)
            : null,
        description: document.getElementById('productDescription').value,
        imageUrl: document.getElementById('productImageUrl').value,
        badge: document.getElementById('productBadge').value || null,
        inStock: document.getElementById('productInStock').checked
    };

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = isEditMode ? 'Updating...' : 'Adding...';

    try {
        let response;

        if (isEditMode) {
            const productId = document.getElementById('productId').value;
            response = await fetch(`${API_URL}/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }

        if (response.ok) {
            alert(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
            loadProducts();
            showSection('products');
            resetForm();
        } else {
            alert('Error saving product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isEditMode ? 'Update Product' : 'Add Product';
    }
});

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    isEditMode = true;

    // Fill form with product data
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImageUrl').value = product.imageUrl;
    document.getElementById('productBadge').value = product.badge || '';
    document.getElementById('productInStock').checked = product.inStock;

    // Update form title and button
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('submitBtn').textContent = 'Update Product';

    // Show form section
    document.getElementById('add-product-section').classList.add('active');
    document.getElementById('products-section').classList.remove('active');
    document.getElementById('pageTitle').textContent = 'Edit Product';

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
}

// Delete product
function deleteProduct(productId) {
    productToDelete = productId;
    document.getElementById('deleteModal').classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    productToDelete = null;
}

// Confirm delete
document.getElementById('confirmDeleteBtn')?.addEventListener('click', async () => {
    if (!productToDelete) return;

    try {
        const response = await fetch(`${API_URL}/products/${productToDelete}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Product deleted successfully!');
            loadProducts();
            closeDeleteModal();
        } else {
            alert('Error deleting product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting product');
    }
});

// Cancel form
function cancelForm() {
    showSection('products');
    resetForm();
}