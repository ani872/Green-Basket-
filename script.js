document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.hero-search-box input');
    const searchBtn = document.querySelector('.hero-search-box button');
    
   
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll('.item');
        
        if(searchTerm === '') {
            products.forEach(product => {
                product.style.display = 'block';
                product.style.opacity = '1';
            });
            return;
        }
        
        products.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            const productDesc = product.querySelector('.about-product').textContent.toLowerCase();
            
            if(productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                product.style.display = 'block';
                product.style.opacity = '1';
                product.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    product.style.transform = 'scale(1)';
                }, 300);
            } else {
                product.style.opacity = '0.3';
                product.style.transform = 'scale(0.95)';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            performSearch();
        }
    });
});


let cartCount = 0;
let cartItems = [];

function updateCartUI() {
    const giftIcon = document.querySelector('.nav-right-option a i.fa-gift');
    if(giftIcon && cartCount > 0) {
        giftIcon.style.position = 'relative';
        let badge = giftIcon.parentElement.querySelector('.cart-badge');
        if(!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: 5px;
                right: 15px;
                background: #ff4757;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                animation: bounce 0.5s ease;
            `;
            giftIcon.parentElement.appendChild(badge);
        }
        badge.textContent = cartCount;
    }
}


document.addEventListener('click', function(e) {
    if(e.target.textContent.includes('Add to Cart') || e.target.textContent.includes('Add to cart')) {
        e.preventDefault();
        
        const productCard = e.target.closest('.item');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price strong').textContent;
        
       
        cartItems.push({
            name: productName,
            price: productPrice,
            id: Date.now()
        });
        
        cartCount++;
        updateCartUI();
        
        e.target.style.background = '#4CAF50';
        e.target.textContent = 'Added!';
        e.target.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            e.target.style.background = '#1a1818';
            e.target.textContent = 'Add to Cart';
            e.target.style.transform = 'scale(1)';
        }, 1500);
        
        
        showNotification(`${productName} added to cart!`);
    }
});


document.addEventListener('click', function(e) {
    if(e.target.classList.contains('buy')) {
        e.preventDefault();
        
        const productCard = e.target.closest('.item');
        const productName = productCard.querySelector('.product-name').textContent;
        
        
        e.target.style.background = '#2ecc71';
        e.target.textContent = 'Processing...';
        
        setTimeout(() => {
            showNotification(`Redirecting to checkout for ${productName}...`);
            e.target.style.background = 'rgb(150, 149, 149)';
            e.target.textContent = 'Buy';
        }, 2000);
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


document.querySelectorAll('.category-box .box').forEach((box, index) => {
    box.addEventListener('click', function() {
        const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages', 'Bakery'];
        showNotification(`Browsing ${categories[index]} category...`);
        
       
        this.style.transform = 'scale(0.85)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});


document.querySelectorAll('.navbar a, .footer a').forEach(link => {
    link.addEventListener('click', function(e) {
        if(this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

function animatePrice(element) {
    const finalPrice = parseFloat(element.textContent.replace('$', ''));
    const duration = 1000;
    const steps = 30;
    const increment = finalPrice / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        element.textContent = `$${current.toFixed(2)}`;
        
        if(step >= steps) {
            clearInterval(timer);
            element.textContent = `$${finalPrice.toFixed(2)}`;
        }
    }, duration / steps);
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.target.classList.contains('item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            if(entry.target.classList.contains('box')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        }
    });
}, observerOptions);


document.querySelectorAll('.item, .box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('item') ? 'translateY(30px)' : 'scale(0.8)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});


let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if(scrollTop > lastScrollTop && scrollTop > 100) {
       
        header.style.transform = 'translateY(-100%)';
    } else {
        
        header.style.transform = 'translateY(0)';
    }
    
   
    if(scrollTop > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

window.addEventListener('load', function() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                border: 4px solid #f3f3f3;
                border-top: 4px solid #4CAF50;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <h3 style="color: #333;">Loading Green Basket...</h3>
        </div>
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 1500);
});


function filterProducts(category) {
    const products = document.querySelectorAll('.item');
    
    products.forEach((product, index) => {
        setTimeout(() => {
            product.style.transform = 'scale(0.8)';
            product.style.opacity = '0.5';
            
            setTimeout(() => {
                product.style.transform = 'scale(1)';
                product.style.opacity = '1';
            }, 200);
        }, index * 100);
    });
}

console.log('Green Basket JavaScript loaded successfully!');