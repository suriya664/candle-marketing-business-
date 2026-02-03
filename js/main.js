// Main JavaScript for Lumière Candle Co.

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
    updateDarkModeIcon();
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (html.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.add('translate-x-full');
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cartCount');

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Add to cart buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
        button.addEventListener('click', function() {
            const productCard = this.closest('.bg-gray-50, .dark\\:bg-gray-700');
            if (productCard) {
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.text-orange-600, .dark\\:text-orange-400').textContent;
                
                const existingItem = cart.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                
                // Show success message
                showNotification('Product added to cart!');
            }
        });
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Initialize cart count on page load
updateCartCount();

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter subscription
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Subscribe')) {
        button.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            if (emailInput && emailInput.type === 'email') {
                const email = emailInput.value;
                if (validateEmail(email)) {
                    showNotification('Successfully subscribed to newsletter!');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address');
                }
            }
        });
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Page load animations
window.addEventListener('load', () => {
    document.querySelectorAll('.animate-fade-in-up').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Active navigation highlighting
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href === 'index.html' && currentPath === '/')) {
            link.classList.add('text-orange-600', 'dark:text-orange-400', 'font-semibold');
            link.classList.remove('text-gray-700', 'dark:text-gray-300');
        } else {
            link.classList.remove('text-orange-600', 'dark:text-orange-400', 'font-semibold');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
        }
    });
}

// Initialize active navigation
updateActiveNavigation();
