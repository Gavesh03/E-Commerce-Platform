// Checkout Page Script

let cart = [];
let shippingData = {};
let paymentData = {};
let currentStep = 1;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayOrderSummary();
    setupPaymentMethodListeners();
    checkUserLogin();
});

// Check if user is logged in
function checkUserLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        // Pre-fill email if user is logged in
        document.getElementById('email').value = userData.email || '';
        document.getElementById('firstName').value = userData.fullName?.split(' ')[0] || '';
        document.getElementById('lastName').value = userData.fullName?.split(' ').slice(1).join(' ') || '';
    }
}

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        // No items in cart, redirect to shop
        alert('Your cart is empty!');
        window.location.href = 'index.html#products';
    }
}

// Display order summary
function displayOrderSummary() {
    const summaryItemsDiv = document.getElementById('summaryItems');

    summaryItemsDiv.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.imageUrl || 'images/products/placeholder.jpg'}" 
                 alt="${item.name}" 
                 class="summary-item-image"
                 onerror="this.src='https://via.placeholder.com/60'">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');

    updateTotals();
}

// Update totals
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50000 ? 0 : 500;
    const discount = 0; // Can be updated with promo code
    const total = subtotal + shipping - discount;

    document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('summaryDiscount').textContent = discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0);
    document.getElementById('summaryTotal').textContent = formatPrice(total);
}

// Format price
function formatPrice(price) {
    return 'LKR ' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Setup payment method listeners
function setupPaymentMethodListeners() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetailsSection = document.getElementById('cardDetailsSection');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetailsSection.style.display = 'block';
            } else {
                cardDetailsSection.style.display = 'none';
            }
        });
    });
}

// Navigation between steps
function goToPayment() {
    // Validate shipping form
    const form = document.getElementById('shippingForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Save shipping data
    shippingData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        apartment: document.getElementById('apartment').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        postalCode: document.getElementById('postalCode').value,
        notes: document.getElementById('notes').value
    };

    // Update step
    currentStep = 2;
    updateStepDisplay();
}

function goToReview() {
    // Get selected payment method
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

    // Validate card details if card payment
    if (selectedPayment === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;

        if (!cardNumber || !expiry || !cvv || !cardName) {
            alert('Please fill in all card details');
            return;
        }

        paymentData = {
            method: 'card',
            cardNumber: cardNumber,
            expiry: expiry,
            cardName: cardName
        };
    } else {
        paymentData = {
            method: selectedPayment
        };
    }

    // Display review
    displayReview();

    // Update step
    currentStep = 3;
    updateStepDisplay();
}

function goToShipping() {
    currentStep = 1;
    updateStepDisplay();
}

// Update step display
function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Show/hide content
    document.querySelectorAll('.checkout-step-content').forEach(content => {
        content.classList.remove('active');
    });

    if (currentStep === 1) {
        document.getElementById('shipping-step').classList.add('active');
    } else if (currentStep === 2) {
        document.getElementById('payment-step').classList.add('active');
    } else if (currentStep === 3) {
        document.getElementById('review-step').classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Display review information
function displayReview() {
    // Shipping info
    const reviewShipping = document.getElementById('reviewShipping');
    reviewShipping.innerHTML = `
        <p><strong>${shippingData.firstName} ${shippingData.lastName}</strong></p>
        <p>${shippingData.email}</p>
        <p>${shippingData.phone}</p>
        <p>${shippingData.address}${shippingData.apartment ? ', ' + shippingData.apartment : ''}</p>
        <p>${shippingData.city}, ${shippingData.province} ${shippingData.postalCode}</p>
        ${shippingData.notes ? `<p><em>Notes: ${shippingData.notes}</em></p>` : ''}
    `;

    // Payment info
    const reviewPayment = document.getElementById('reviewPayment');
    let paymentText = '';

    if (paymentData.method === 'card') {
        paymentText = `
            <p><strong>Credit/Debit Card</strong></p>
            <p>Card ending in ${paymentData.cardNumber.slice(-4)}</p>
            <p>${paymentData.cardName}</p>
        `;
    } else if (paymentData.method === 'bank') {
        paymentText = '<p><strong>Bank Transfer</strong></p><p>You will receive bank details via email</p>';
    } else {
        paymentText = '<p><strong>Cash on Delivery</strong></p><p>Pay when you receive your order</p>';
    }

    reviewPayment.innerHTML = paymentText;

    // Order items
    const reviewItems = document.getElementById('reviewItems');
    reviewItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.imageUrl || 'images/products/placeholder.jpg'}" 
                 alt="${item.name}" 
                 class="summary-item-image"
                 onerror="this.src='https://via.placeholder.com/60'">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim();

    if (promoCode === 'LPZ10') {
        alert('Promo code applied! 10% discount');
        // You can update totals here
    } else if (promoCode) {
        alert('Invalid promo code');
    }
}

// Place order
function placeOrder() {
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!agreeTerms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }

    // Generate random order number
    const orderNumber = 'LPZ' + Date.now().toString().slice(-8);

    // Create order object
    const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        shipping: shippingData,
        payment: paymentData,
        items: cart,
        total: calculateTotal()
    };

    // Save order to localStorage (in production, send to backend)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success modal
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('successModal').classList.add('active');
}

// Calculate total
function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50000 ? 0 : 500;
    return subtotal + shipping;
}

// Go to home
function goToHome() {
    window.location.href = 'index.html';
}

// Format card number input
document.getElementById('cardNumber')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formatted;
});

// Format expiry input
document.getElementById('expiry')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});