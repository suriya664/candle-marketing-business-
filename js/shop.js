// Shop page JavaScript

// Product data
const products = [
    {
        id: 1,
        name: "Lavender Dream",
        scent: "floral",
        size: "medium",
        price: 24.99,
        burnTime: 40,
        rating: 4.8,
        image: "https://www.roses-andre-eve.com/2451-thickbox_default/lavender-dreamR-interlav.jpg",
        description: "Calming lavender with hints of vanilla",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Citrus Burst",
        scent: "citrus",
        size: "medium",
        price: 22.99,
        burnTime: 40,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Energizing orange and grapefruit blend",
        badge: "New"
    },
    {
        id: 3,
        name: "Sandalwood Serenity",
        scent: "woody",
        size: "large",
        price: 26.99,
        burnTime: 60,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Earthy sandalwood with cedar notes"
    },
    {
        id: 4,
        name: "Vanilla Bliss",
        scent: "spicy",
        size: "large",
        price: 28.99,
        burnTime: 60,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Rich vanilla with caramel undertones",
        badge: "Limited"
    },
    {
        id: 5,
        name: "Ocean Breeze",
        scent: "fresh",
        size: "small",
        price: 18.99,
        burnTime: 20,
        rating: 4.6,
        image: "https://images.squarespace-cdn.com/content/v1/5a4f953d9f07f548ad1d63fd/1555334553517-BJQ2S1SOOYE55H1EGHY2/ocean+breeze.jpeg?format=2500w",
        description: "Fresh sea salt with marine notes"
    },
    {
        id: 6,
        name: "Rose Garden",
        scent: "floral",
        size: "medium",
        price: 25.99,
        burnTime: 40,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Romantic rose with peony notes"
    },
    {
        id: 7,
        name: "Cedarwood Forest",
        scent: "woody",
        size: "large",
        price: 32.99,
        burnTime: 60,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Deep cedar with pine and moss",
        badge: "Premium"
    },
    {
        id: 8,
        name: "Lemon Zest",
        scent: "citrus",
        size: "small",
        price: 16.99,
        burnTime: 20,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Bright lemon with verbena"
    },
    {
        id: 9,
        name: "Cinnamon Spice",
        scent: "spicy",
        size: "medium",
        price: 27.99,
        burnTime: 40,
        rating: 4.7,
        image: "https://sc02.alicdn.com/kf/Hd0c44c6ff5864f47af56f249443475a7R.png",
        description: "Warm cinnamon with nutmeg"
    },
    {
        id: 10,
        name: "Eucalyptus Mint",
        scent: "fresh",
        size: "large",
        price: 29.99,
        burnTime: 60,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Refreshing eucalyptus with cool mint"
    },
    {
        id: 11,
        name: "Jasmine Tea",
        scent: "floral",
        size: "small",
        price: 19.99,
        burnTime: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Delicate jasmine with green tea"
    },
    {
        id: 12,
        name: "Patchouli Dreams",
        scent: "woody",
        size: "medium",
        price: 24.99,
        burnTime: 40,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Earthy patchouli with sweet amber"
    }
];

let filteredProducts = [...products];

// Render products
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');

    productsGrid.innerHTML = '';
    productCount.textContent = productsToRender.length;

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to new "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.text-orange-600').textContent;

            addToCart(productName, productPrice);
        });
    });
}

// Create product card HTML
function createProductCard(product) {
    const badgeHtml = product.badge ?
        `<span class="absolute top-4 right-4 bg-orange-600 text-white text-xs px-2 py-1 rounded">${product.badge}</span>` : '';

    const div = document.createElement('div');
    div.className = 'product-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300';
    div.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${badgeHtml}
        </div>
        <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${product.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">${product.description}</p>
            <div class="flex items-center justify-between mb-3">
                <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">$${product.price}</span>
                <div class="flex items-center">
                    <i class="fas fa-star text-yellow-400 text-sm"></i>
                    <span class="text-gray-600 dark:text-gray-400 text-sm ml-1">${product.rating}</span>
                </div>
            </div>
            <div class="text-center">
                <button class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-200 add-to-cart">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return div;
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedScents = Array.from(document.querySelectorAll('.scent-filter:checked')).map(cb => cb.value);
    const selectedPrice = document.querySelector('.price-filter:checked')?.value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        const matchesScent = selectedScents.length === 0 || selectedScents.includes(product.scent);
        const matchesPrice = !selectedPrice || checkPriceRange(product.price, selectedPrice);

        return matchesSearch && matchesScent && matchesPrice;
    });

    renderProducts(filteredProducts);
}

// Check price range
function checkPriceRange(price, range) {
    switch (range) {
        case '0-25': return price < 25;
        case '25-30': return price >= 25 && price < 30;
        case '30-35': return price >= 30 && price < 35;
        case '35+': return price >= 35;
        default: return true;
    }
}

// Sort products
function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = [...products];
    }
    renderProducts(filteredProducts);
}

// Add to cart function
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Clear filters
function clearAllFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.scent-filter').forEach(cb => cb.checked = false);
    document.querySelectorAll('.price-filter').forEach(cb => cb.checked = false);
    document.getElementById('sortSelect').value = 'featured';

    filteredProducts = [...products];
    renderProducts(filteredProducts);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    renderProducts(products);

    // Search
    document.getElementById('searchInput').addEventListener('input', filterProducts);

    // Scent filters
    document.querySelectorAll('.scent-filter').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Price filters
    document.querySelectorAll('.price-filter').forEach(radio => {
        radio.addEventListener('change', filterProducts);
    });

    // Sort
    document.getElementById('sortSelect').addEventListener('change', function () {
        sortProducts(this.value);
    });

    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);

    // Update cart count
    updateCartCount();
});
