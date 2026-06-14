const API_BASE = 'http://localhost:3000/api';
let currentUser = null;
let currentProduct = null;
let currentToken = localStorage.getItem('priceCompareToken');

// ===== PROFESSIONAL E-COMMERCE PRODUCT DATABASE =====
const MOCK_PRODUCTS = {
    // SMARTPHONES/MOBILES
    'mobile': [
        {
            id: 1,
            name: 'iPhone 15 Pro Max',
            category: 'Smartphones',
            site: 'Amazon',
            priceTag: '₹1,39,999',
            price: 139999,
            originalPrice: 159999,
            savings: '-13%',
            rating: 4.8,
            reviewCount: 5623,
            image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg',
            description: 'Apple A17 Pro Chip, 6.7" Super Retina XDR, 256GB Storage, Titanium Design',
            specs: '6.7" Display | 256GB | Face ID | IP68 Waterproof',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 2,
            name: 'iPhone 15 Pro Max',
            category: 'Smartphones',
            site: 'Flipkart',
            priceTag: '₹1,41,999',
            price: 141999,
            originalPrice: 159999,
            savings: '-11%',
            rating: 4.7,
            reviewCount: 4521,
            image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg',
            description: 'Apple A17 Pro Chip, 6.7" Super Retina XDR, 256GB Storage',
            specs: '6.7" Display | 256GB | 5G | Battery: 4,685 mAh',
            stock: 'In Stock'
        },
        {
            id: 3,
            name: 'Samsung Galaxy S24 Ultra',
            category: 'Smartphones',
            site: 'Amazon',
            priceTag: '₹1,29,999',
            price: 129999,
            originalPrice: 154999,
            savings: '-16%',
            rating: 4.6,
            reviewCount: 3421,
            image: 'https://m.media-amazon.com/images/I/71V8r51-SnL._SX679_.jpg',
            description: 'Snapdragon 8 Gen 3, 6.8" AMOLED, 256GB Storage, S Pen Included',
            specs: '6.8" Dynamic AMOLED | Snapdragon 8 Gen 3 | IP68',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 4,
            name: 'Samsung Galaxy S24 Ultra',
            category: 'Smartphones',
            site: 'Myntra',
            priceTag: '₹1,32,999',
            price: 132999,
            originalPrice: 154999,
            savings: '-14%',
            rating: 4.5,
            reviewCount: 2890,
            image: 'https://m.media-amazon.com/images/I/71V8r51-SnL._SX679_.jpg',
            description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3',
            specs: '256GB | Snapdragon 8 Gen 3 | 6.8" AMOLED Display',
            stock: 'In Stock'
        },
        {
            id: 5,
            name: 'OnePlus 12',
            category: 'Smartphones',
            site: 'Amazon',
            priceTag: '₹64,999',
            price: 64999,
            originalPrice: 84999,
            savings: '-24%',
            rating: 4.4,
            reviewCount: 2156,
            image: 'https://m.media-amazon.com/images/I/71gPAI8zDWL._SX679_.jpg',
            description: 'Snapdragon 8 Gen 3, 6.82" AMOLED, 256GB, 5000mAh Battery',
            specs: '256GB Storage | 12GB RAM | 120Hz Display',
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 6,
            name: 'Xiaomi 14',
            category: 'Smartphones',
            site: 'Flipkart',
            priceTag: '₹59,999',
            price: 59999,
            originalPrice: 79999,
            savings: '-25%',
            rating: 4.3,
            reviewCount: 1834,
            image: 'https://m.media-amazon.com/images/I/71a0VG5bsQL._SX679_.jpg',
            description: 'Snapdragon 8 Gen 3, 6.36" AMOLED, Leica Optics',
            specs: 'Snapdragon 8 Gen 3 | 512GB Storage | Leica Camera System',
            stock: 'In Stock'
        }
    ],

    // LAPTOPS
    'laptop': [
        {
            id: 7,
            name: 'HP Pavilion 15 (2024)',
            category: 'Laptops',
            site: 'Amazon',
            priceTag: '₹45,999',
            price: 45999,
            originalPrice: 65999,
            savings: '-30%',
            rating: 4.5,
            reviewCount: 2543,
            image: 'https://m.media-amazon.com/images/I/71hKgKI2YUL._SY500_.jpg',
            description: 'Intel Core i5-13420H, 16GB RAM, 512GB SSD, RTX 3050, 15.6" FHD IPS',
            specs: 'Intel i5-13420H | 16GB DDR5 | 512GB NVMe SSD | RTX 3050',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 8,
            name: 'HP Pavilion 15 (2024)',
            category: 'Laptops',
            site: 'Flipkart',
            priceTag: '₹47,999',
            price: 47999,
            originalPrice: 65999,
            savings: '-27%',
            rating: 4.3,
            reviewCount: 1890,
            image: 'https://m.media-amazon.com/images/I/71hKgKI2YUL._SY500_.jpg',
            description: 'Intel i5, 16GB, 512GB, RTX 3050 - 15.6" Display',
            specs: 'Intel i5-13420H | 16GB DDR5 | 512GB SSD | RTX 3050',
            stock: 'In Stock'
        },
        {
            id: 9,
            name: 'Lenovo Legion 5 Pro',
            category: 'Laptops',
            site: 'Amazon',
            priceTag: '₹89,999',
            price: 89999,
            originalPrice: 129999,
            savings: '-31%',
            rating: 4.6,
            reviewCount: 3421,
            image: 'https://m.media-amazon.com/images/I/71qEROvR8xL._SX679_.jpg',
            description: 'AMD Ryzen 7, 16GB, 512GB SSD, RTX 4050, 16" 165Hz Display',
            specs: 'Ryzen 7 7745HX | 16GB RAM | RTX 4050 | 165Hz Display',
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 10,
            name: 'Dell XPS 13 Plus',
            category: 'Laptops',
            site: 'Myntra',
            priceTag: '₹1,09,999',
            price: 109999,
            originalPrice: 139999,
            savings: '-21%',
            rating: 4.7,
            reviewCount: 2234,
            image: 'https://m.media-amazon.com/images/I/71+D2T8Q5rL._SX679_.jpg',
            description: 'Intel Core Ultra 5, 16GB, 512GB, 13.4" OLED Touch Display',
            specs: 'Intel Core Ultra 5 | 16GB RAM | 512GB SSD | OLED Display',
            stock: 'In Stock'
        }
    ],

    // SHOES
    'shoes': [
        {
            id: 11,
            name: 'Nike Air Max 90',
            category: 'Footwear',
            site: 'Amazon',
            priceTag: '₹8,999',
            price: 8999,
            originalPrice: 12999,
            savings: '-30%',
            rating: 4.4,
            reviewCount: 2891,
            image: 'https://m.media-amazon.com/images/I/71hl0EY5N3L._AC_SY695_.jpg',
            description: 'Classic Running Shoes, Comfortable Cushioning, Durable Design',
            specs: 'Mesh Upper | Air Max Cushioning | Size 6-12 Available',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 12,
            name: 'Nike Air Max 90',
            category: 'Footwear',
            site: 'Flipkart',
            priceTag: '₹9,499',
            price: 9499,
            originalPrice: 12999,
            savings: '-27%',
            rating: 4.2,
            reviewCount: 1876,
            image: 'https://m.media-amazon.com/images/I/71hl0EY5N3L._AC_SY695_.jpg',
            description: 'Nike Air Max 90 - Premium Running Shoes',
            specs: 'Mesh Upper | Air Max Cushioning | Size 6-12 Available',
            stock: 'In Stock'
        },
        {
            id: 13,
            name: 'Adidas Ultraboost 22',
            category: 'Footwear',
            site: 'Myntra',
            priceTag: '₹10,499',
            price: 10499,
            originalPrice: 16999,
            savings: '-38%',
            rating: 4.6,
            reviewCount: 3421,
            image: 'https://m.media-amazon.com/images/I/71KGM2s9uML._AC_SY695_.jpg',
            description: 'Boost Cushioning Technology, Responsive Comfort',
            specs: 'Boost Cushioning | Premium Materials | Size 5-13 Available',
            stock: 'In Stock'
        },
        {
            id: 14,
            name: 'Puma RS-X Sneaker',
            category: 'Footwear',
            site: 'Amazon',
            priceTag: '₹5,999',
            price: 5999,
            originalPrice: 8999,
            savings: '-33%',
            rating: 4.3,
            reviewCount: 1543,
            image: 'https://m.media-amazon.com/images/I/71qcm5-gOcL._AC_SY695_.jpg',
            description: 'Retro Style Sneaker, Premium Materials',
            specs: 'Retro Design | Lightweight | Size 5-13 Available',
            lowestPrice: true,
            stock: 'In Stock'
        }
    ],

    // SMARTWATCHES
    'watch': [
        {
            id: 15,
            name: 'Apple Watch Series 9',
            category: 'Smartwatches',
            site: 'Amazon',
            priceTag: '₹42,999',
            price: 42999,
            originalPrice: 55999,
            savings: '-23%',
            rating: 4.7,
            reviewCount: 4321,
            image: 'https://m.media-amazon.com/images/I/71TKCVNQu9L._AC_SY679_.jpg',
            description: '41mm LTPO OLED Display, S9 Chip, Fitness Tracking, ECG',
            specs: '41mm | Always-On Display | Water Resistant | 18-hour Battery',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 16,
            name: 'Samsung Galaxy Watch 6',
            category: 'Smartwatches',
            site: 'Flipkart',
            priceTag: '₹18,999',
            price: 18999,
            originalPrice: 26999,
            savings: '-30%',
            rating: 4.5,
            reviewCount: 2876,
            image: 'https://m.media-amazon.com/images/I/71T5oDLx7cL._AC_SY679_.jpg',
            description: 'Super AMOLED Display, Exynos W930 Chip, 5ATM Water Resistance',
            specs: 'Super AMOLED | Exynos W930 | 5ATM Water Resistant',
            stock: 'In Stock'
        },
        {
            id: 17,
            name: 'Garmin Epix Gen 2',
            category: 'Smartwatches',
            site: 'Amazon',
            priceTag: '₹54,999',
            price: 54999,
            originalPrice: 72999,
            savings: '-25%',
            rating: 4.6,
            reviewCount: 1234,
            image: 'https://m.media-amazon.com/images/I/71gkNGBUlyL._AC_SY679_.jpg',
            description: 'AMOLED Touch Display, GPS, Training Apps, 11-day Battery',
            specs: 'AMOLED Display | GPS | 11-day Battery | Sports Apps',
            lowestPrice: true,
            stock: 'In Stock'
        }
    ],

    // TABLETS
    'tablet': [
        {
            id: 18,
            name: 'iPad Air (2024)',
            category: 'Tablets',
            site: 'Amazon',
            priceTag: '₹64,999',
            price: 64999,
            originalPrice: 79999,
            savings: '-19%',
            rating: 4.6,
            reviewCount: 2543,
            image: 'https://m.media-amazon.com/images/I/71nzJRaKqsL._AC_SY679_.jpg',
            description: 'M2 Chip, 11-inch Liquid Retina Display, 256GB Storage',
            specs: '11-inch | M2 Processor | 256GB Storage | iPadOS 17',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 19,
            name: 'Samsung Galaxy Tab S9',
            category: 'Tablets',
            site: 'Flipkart',
            priceTag: '₹49,999',
            price: 49999,
            originalPrice: 69999,
            savings: '-29%',
            rating: 4.5,
            reviewCount: 1987,
            image: 'https://m.media-amazon.com/images/I/71X7K0wQZ9L._AC_SY679_.jpg',
            description: '11-inch AMOLED, Snapdragon 8 Gen 2, 128GB Storage',
            specs: '11-inch AMOLED | Snapdragon 8 Gen 2 | 128GB Storage',
            stock: 'In Stock'
        },
        {
            id: 20,
            name: 'Lenovo Tab P12 Pro',
            category: 'Tablets',
            site: 'Amazon',
            priceTag: '₹39,999',
            price: 39999,
            originalPrice: 59999,
            savings: '-33%',
            rating: 4.4,
            reviewCount: 1456,
            image: 'https://m.media-amazon.com/images/I/81U0p6sCZxL._AC_SY679_.jpg',
            description: '12.6" OLED Display, MediaTek Kompanio 1300, 128GB',
            specs: '12.6" OLED | MediaTek Kompanio 1300 | 128GB Storage',
            lowestPrice: true,
            stock: 'In Stock'
        }
    ],

    // BLUETOOTH DEVICES
    'bluetooth': [
        {
            id: 21,
            name: 'Sony WH-1000XM5 Headphones',
            category: 'Audio',
            site: 'Amazon',
            priceTag: '₹29,999',
            price: 29999,
            originalPrice: 42999,
            savings: '-30%',
            rating: 4.7,
            reviewCount: 5234,
            image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SY679_.jpg',
            description: 'ANC Technology, 30-hour Battery, Multipoint Connection',
            specs: 'Active Noise Cancellation | 30-hour Battery | Bluetooth 5.3',
            bestDeal: true,
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 22,
            name: 'Bose QuietComfort 45',
            category: 'Audio',
            site: 'Flipkart',
            priceTag: '₹31,999',
            price: 31999,
            originalPrice: 45999,
            savings: '-30%',
            rating: 4.6,
            reviewCount: 3876,
            image: 'https://m.media-amazon.com/images/I/61IiSN5bBJL._AC_SY679_.jpg',
            description: 'Advanced Noise Cancelling, Comfortable Design, 24-hour Battery',
            specs: 'Active Noise Cancellation | 24-hour Battery | Bluetooth 5.3',
            stock: 'In Stock'
        },
        {
            id: 23,
            name: 'Apple AirPods Pro 2',
            category: 'Audio',
            site: 'Amazon',
            priceTag: '₹26,999',
            price: 26999,
            originalPrice: 35999,
            savings: '-25%',
            rating: 4.8,
            reviewCount: 4521,
            image: 'https://m.media-amazon.com/images/I/71spRm32ptL._AC_SY679_.jpg',
            description: 'Active Noise Cancellation, Adaptive Audio, 6-hour Battery',
            lowestPrice: true,
            stock: 'In Stock'
        },
        {
            id: 24,
            name: 'JBL Flip 6 Speaker',
            category: 'Audio',
            site: 'Myntra',
            priceTag: '₹6,999',
            price: 6999,
            originalPrice: 9999,
            savings: '-30%',
            rating: 4.4,
            reviewCount: 2143,
            image: 'https://m.media-amazon.com/images/I/71EAhXZIp0L._AC_SY679_.jpg',
            description: 'Portable Waterproof Speaker, 12-hour Battery Life',
            specs: 'IPX7 Waterproof | 12-hour Battery | Portable Design',
            stock: 'In Stock'
        }
    ],

    // ACCESSORIES
    'charger': [
        {
            id: 25,
            name: 'Anker 65W USB-C Charger',
            category: 'Accessories',
            site: 'Amazon',
            priceTag: '₹2,999',
            price: 2999,
            originalPrice: 4999,
            savings: '-40%',
            rating: 4.6,
            reviewCount: 3421,
            image: 'https://m.media-amazon.com/images/I/71e4x5DQA3L._AC_SY679_.jpg',
            description: 'Fast Charging, Multi-port, Foldable Design',
            specs: '65W Output | USB-C + USB-A | GaN Technology',
            lowestPrice: true,
            stock: 'In Stock'
        }
    ]
};

window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && currentToken) {
        fetchProfile();
    }
    loadRecommendations();
});

function apiHeaders(auth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
    }
    return headers;
}

function getProductImage(product) {
    return product.image || '/assets/placeholder.svg';
}

async function sendRequest(path, method = 'GET', body = null, auth = true) {
    const options = { method, headers: apiHeaders(auth) };
    if (body) options.body = JSON.stringify(body);
    const response = await fetch(`${API_BASE}${path}`, options);
    return response.json();
}

async function openLogin() {
    document.getElementById('authForms').innerHTML = `
        <h2>Login</h2>
        <input id="loginEmail" type="email" placeholder="Email" />
        <input id="loginPassword" type="password" placeholder="Password" />
        <button onclick="loginUser()">Login</button>
        <button class="ghost" onclick="googleLogin()">Continue with Google</button>
        <p>Don't have an account? <a href="#" onclick="openSignup()">Sign up</a></p>
    `;
    showAuthModal();
}

async function openSignup() {
    document.getElementById('authForms').innerHTML = `
        <h2>Sign Up</h2>
        <input id="signupName" placeholder="Name" />
        <input id="signupEmail" type="email" placeholder="Email" />
        <input id="signupPassword" type="password" placeholder="Password" />
        <button onclick="signupUser()">Create account</button>
        <button class="ghost" onclick="googleLogin()">Continue with Google</button>
        <p>Already have an account? <a href="#" onclick="openLogin()">Login</a></p>
    `;
    showAuthModal();
}

function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function closeDrawer() {
    const drawer = document.getElementById('detailDrawer');
    drawer.style.display = 'none';
    drawer.setAttribute('aria-hidden', 'true');
}

async function signupUser() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    if (!name || !email || !password) return alert('Please fill all fields');

    const result = await sendRequest('/auth/signup', 'POST', { name, email, password }, false);
    if (result.token) {
        currentToken = result.token;
        localStorage.setItem('priceCompareToken', currentToken);
        currentUser = result.user;
        closeAuthModal();
        fetchProfile();
    } else {
        alert(result.error || 'Signup failed');
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return alert('Please fill both fields');

    const result = await sendRequest('/auth/login', 'POST', { email, password }, false);
    if (result.token) {
        currentToken = result.token;
        localStorage.setItem('priceCompareToken', currentToken);
        currentUser = result.user;
        closeAuthModal();
        fetchProfile();
    } else {
        alert(result.error || 'Login failed');
    }
}

async function googleLogin() {
    const result = await sendRequest('/auth/google', 'GET', null, false);
    if (result.token) {
        currentToken = result.token;
        localStorage.setItem('priceCompareToken', currentToken);
        currentUser = result.user;
        closeAuthModal();
        fetchProfile();
    } else {
        alert('Google login not available');
    }
}

async function fetchProfile() {
    const result = await sendRequest('/user/profile');
    if (result.error) {
        console.warn(result.error);
        return;
    }

    currentUser = result;
    document.querySelector('.topbar nav').innerHTML = `
        <div class="profile-chip">
            <img src="${currentUser.profileImage}" alt="${currentUser.name}" />
            <span>${currentUser.name}</span>
        </div>
        <button class="ghost" onclick="logout()">Logout</button>
    `;
    renderUserPanel();
}

function logout() {
    currentToken = null;
    currentUser = null;
    localStorage.removeItem('priceCompareToken');
    document.querySelector('.topbar nav').innerHTML = `
        <button class="ghost" onclick="openLogin()">Login</button>
        <button class="primary" onclick="openSignup()">Sign Up</button>
    `;
    document.getElementById('profileSummary').innerHTML = '';
    document.getElementById('wishlistItems').innerHTML = 'No saved products yet.';
    document.getElementById('recentItems').innerHTML = 'Start a search to see recent products.';
    document.getElementById('savedAlerts').innerHTML = 'No alerts yet.';
}

function renderUserPanel() {
    if (!currentUser) return;
    document.getElementById('profileSummary').innerHTML = `
        <div class="profile-card">
            <img src="${currentUser.profileImage}" alt="${currentUser.name}" />
            <div>
                <h3>${currentUser.name}</h3>
                <p>${currentUser.email}</p>
                <p>${currentUser.wishlist.length} saved products</p>
            </div>
        </div>
    `;

    const wishlist = currentUser.wishlist || [];
    const recent = currentUser.recentViews || [];
    const alerts = currentUser.alerts || [];

    document.getElementById('wishlistItems').innerHTML = wishlist.length
        ? wishlist.map(item => `<div class="small-card"><strong>${item.name}</strong><span>${item.priceTag}</span></div>`).join('')
        : 'No saved products yet.';

    document.getElementById('recentItems').innerHTML = recent.length
        ? recent.map(item => `<div class="small-card"><strong>${item.name}</strong><span>${item.site}</span></div>`).join('')
        : 'Start a search to see recent products.';

    document.getElementById('savedAlerts').innerHTML = alerts.length
        ? alerts.map(alert => `<div class="small-card"><strong>${alert.site}</strong><span>${alert.method} @ ₹${alert.threshold}</span></div>`).join('')
        : 'No alerts yet.';
}

async function saveAlert(event) {
    event.preventDefault();
    if (!currentToken) return alert('Login to create alerts');

    const product = document.getElementById('alertProduct').value.trim();
    const threshold = document.getElementById('alertThreshold').value;
    const method = document.getElementById('alertMethod').value;
    if (!product || !threshold) return alert('Please fill in alert details');

    const result = await sendRequest('/user/alerts', 'POST', {
        productId: product,
        site: product,
        threshold: Number(threshold),
        method
    });
    if (result.error) return alert(result.error);
    currentUser.alerts = result.alerts;
    renderUserPanel();
    alert('Price alert created');
}

async function searchProduct() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    if (!query) return alert('🔍 Please type a product name');

    document.getElementById('statusMessage').textContent = `🔍 Searching for "${query}"...`;
    
    // Flatten all products and search
    let results = [];
    
    for (const [category, products] of Object.entries(MOCK_PRODUCTS)) {
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.specs && p.specs.toLowerCase().includes(query)) ||
            category.includes(query)
        );
        results.push(...filtered);
    }

    // Remove duplicates
    results = results.filter((item, index, self) =>
        index === self.findIndex(t => t.id === item.id)
    );

    renderSearchResults(results);
    
    if (results.length === 0) {
        document.getElementById('statusMessage').textContent = `❌ No products found for "${query}". Try: laptop, mobile, shoes, tablet, watch, bluetooth, charger`;
    } else {
        document.getElementById('statusMessage').textContent = `✅ Found ${results.length} result(s) for "${query}"`;
    }
}

function renderSearchResults(items) {
    const results = document.getElementById('results');
    if (!items.length) {
        results.innerHTML = '<div class="empty-state">❌ No matching products found. Try: laptop, mobile, shoes, tablet, watch, bluetooth, charger</div>';
        return;
    }

    results.innerHTML = items.map(product => `
        <article class="product-card ${product.bestDeal ? 'best-deal' : ''}">
            <div class="card-top">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}'" />
                <span class="badge">${product.site}</span>
                ${product.lowestPrice ? '<span style="position: absolute; top: 16px; right: 16px; background: #16a34a; color: white; padding: 6px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 600;">🏆 Best Price</span>' : ''}
            </div>
            <div class="card-body">
                <span style="color: #6b7280; font-size: 0.85rem;">📁 ${product.category}</span>
                <h3 style="margin: 6px 0;">${product.name}</h3>
                <p class="description" style="font-size: 0.9rem; color: #4b5563;">${product.description}</p>
                <p style="font-size: 0.85rem; color: #7c3aed; margin: 4px 0;">💡 ${product.specs}</p>
                
                <div class="price-row" style="margin: 12px 0;">
                    <div>
                        <span style="font-size: 1.3rem; font-weight: 700; color: #111827;">${product.priceTag}</span><br>
                        <span style="text-decoration: line-through; color: #9ca3af; font-size: 0.9rem;">₹${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <span style="background: #dbeafe; color: #0369a1; padding: 6px 10px; border-radius: 8px; font-weight: 600;">${product.savings}</span>
                </div>
                
                <div class="meta-row" style="margin: 8px 0; padding: 8px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
                    <span>⭐ ${product.rating} (${product.reviewCount.toLocaleString()} reviews)</span>
                    <span style="background: #ecfdf5; color: #166534; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">✓ ${product.stock}</span>
                </div>
                
                <div class="actions" style="gap: 8px;">
                    <button onclick='viewProduct(${JSON.stringify(product).replace(/'/g, "&#39;")})' style="background: #4f46e5; color: white; border: none; padding: 10px; border-radius: 12px; cursor: pointer; font-weight: 600; width: 100%;">
                        📊 View & Compare
                    </button>
                    <button class="ghost" onclick='toggleWishlist(${JSON.stringify(product).replace(/'/g, "&#39;")})' style="border: 2px solid #e5e7eb; background: white; color: #111827; padding: 10px; border-radius: 12px; cursor: pointer; font-weight: 600; width: 100%;">
                        ♡ Save
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function viewProduct(product) {
    currentProduct = product;
    const drawer = document.getElementById('detailDrawer');
    drawer.style.display = 'block';
    drawer.setAttribute('aria-hidden', 'false');
    renderDetail(product);
    if (currentToken && currentUser) addRecentView(product);
}

function addRecentView(product) {
    if (!currentUser) return;
    const exists = (currentUser.recentViews || []).find(item => item.productId === product.productId);
    if (!exists) {
        currentUser.recentViews = [product, ...(currentUser.recentViews || [])].slice(0, 20);
        renderUserPanel();
    }
}

async function renderDetail(product) {
    document.getElementById('detailContent').innerHTML = `
        <header class="detail-header" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}'" />
            </div>
            <div>
                <span style="background: #eef2ff; color: #4f46e5; padding: 6px 12px; border-radius: 8px; display: inline-block; font-size: 0.85rem; font-weight: 600;">📁 ${product.category}</span>
                
                <h2 style="font-size: 1.8rem; margin: 12px 0 8px; color: #111827;">${product.name}</h2>
                <p style="color: #6b7280; margin: 0 0 16px; font-size: 1rem;">${product.description}</p>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <strong style="display: block; color: #6b7280; font-size: 0.9rem; margin-bottom: 8px;">🔧 Technical Specifications</strong>
                    <p style="margin: 0; color: #111827; font-weight: 500;">${product.specs}</p>
                </div>
                
                <div style="background: #ecfdf5; border: 2px solid #16a34a; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <strong style="display: block; color: #166534; font-size: 0.9rem; margin-bottom: 8px;">✓ Availability & Pricing</strong>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 1.8rem; font-weight: 700; color: #166534;">${product.priceTag}</div>
                            <small style="color: #166534; text-decoration: line-through;">₹${product.originalPrice.toLocaleString()}</small>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 700; color: #16a34a; font-size: 1.2rem;">${product.savings} OFF</div>
                            <small style="color: #166534;">You save: ₹${(product.originalPrice - product.price).toLocaleString()}</small>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div style="background: #dbeafe; padding: 12px; border-radius: 12px; text-align: center;">
                        <strong style="color: #0369a1; display: block;">⭐ ${product.rating}</strong>
                        <small style="color: #0369a1;">${product.reviewCount.toLocaleString()} reviews</small>
                    </div>
                    <div style="background: #ecfdf5; padding: 12px; border-radius: 12px; text-align: center;">
                        <strong style="color: #166534; display: block;">✓ In Stock</strong>
                        <small style="color: #166534;">Ready to ship</small>
                    </div>
                </div>
                
                <button onclick='window.open("https://amazon.in/s?k=${encodeURIComponent(product.name)}", "_blank")' style="width: 100%; padding: 14px; background: #ff9900; color: white; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; margin-bottom: 8px;">
                    🛒 Buy on ${product.site}
                </button>
                <button onclick='toggleWishlist(${JSON.stringify(product).replace(/'/g, "&#39;")})' style="width: 100%; padding: 12px; background: white; border: 2px solid #e5e7eb; border-radius: 12px; font-weight: 600; cursor: pointer;">
                    ♡ Add to Wishlist
                </button>
            </div>
        </header>
        
        <section style="margin-top: 32px;">
            <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: #111827;">📊 Price Comparison Across Platforms</h3>
            <div style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    ${['Amazon', 'Flipkart', 'Myntra', 'Meesho'].map(store => {
                        const storeProduct = Object.values(MOCK_PRODUCTS).flat().find(p => p.site === store && p.name === product.name);
                        if (!storeProduct) return '';
                        return `
                            <div style="background: ${storeProduct.lowestPrice ? '#ecfdf5' : '#f9fafb'}; padding: 12px; border-radius: 10px; border: 2px solid ${storeProduct.lowestPrice ? '#16a34a' : '#e5e7eb'};">
                                <strong style="display: block; margin-bottom: 8px; color: #111827;">${store}</strong>
                                <div style="font-size: 1.3rem; font-weight: 700; color: #4f46e5;">${storeProduct.priceTag}</div>
                                <small style="color: #6b7280;">${storeProduct.savings}</small>
                                ${storeProduct.lowestPrice ? '<div style="margin-top: 6px; background: #16a34a; color: white; padding: 4px; border-radius: 4px; font-size: 0.8rem; text-align: center;">🏆 Best Price</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderHistoryChart(history) {
    if (!history || !history.length) return '<div class="empty-state">Price history not available.</div>';
    const maxPrice = Math.max(...history.map(item => item.price));
    return `
        <div class="history-grid">
            ${history.map(point => `
                <div class="history-bar">
                    <div class="bar" style="height:${Math.round((point.price / maxPrice) * 100)}%"></div>
                    <small>${point.date}</small>
                    <span>₹${point.price}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function openReviewForm(productId) {
    if (!currentToken) {
        openLogin();
        return;
    }
    document.getElementById('detailContent').innerHTML += `
        <section class="review-form">
            <h3>Submit a review</h3>
            <input id="reviewComment" placeholder="Write your review" />
            <input id="reviewRating" type="number" min="1" max="5" placeholder="Rating (1-5)" />
            <button onclick="submitReview('${productId}')">Post Review</button>
        </section>
    `;
}

async function submitReview(productId) {
    const comment = document.getElementById('reviewComment').value.trim();
    const rating = document.getElementById('reviewRating').value;
    if (!comment || !rating) return alert('Please enter review text and rating');

    const result = await sendRequest('/products/reviews', 'POST', { productId, rating, comment }, true);
    if (result.error) return alert(result.error);
    alert('Review posted successfully!');
    if (currentProduct) {
        renderDetail(currentProduct);
    }
}

function loadRecommendations() {
    // Show trending products from all categories
    const allProducts = Object.values(MOCK_PRODUCTS).flat();
    const recommendations = allProducts
        .filter(p => p.bestDeal || p.lowestPrice)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    if (!recommendations.length) return;
    
    document.getElementById('recommendationSummary').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            ${recommendations.map(item => `
                <div class="recommendation-card" style="padding: 16px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; border-radius: 16px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <div style="font-size: 2.5rem;">
                            ${item.category === 'Smartphones' ? '📱' : 
                              item.category === 'Laptops' ? '💻' : 
                              item.category === 'Footwear' ? '👟' : 
                              item.category === 'Smartwatches' ? '⌚' : 
                              item.category === 'Tablets' ? '📱' : 
                              item.category === 'Audio' ? '🎧' : '🛒'}
                        </div>
                        <div>
                            <strong style="display: block; margin-bottom: 4px;">${item.name}</strong>
                            <small>${item.site}</small>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong style="font-size: 1.1rem;">${item.priceTag}</strong>
                            <span style="background: rgba(255,255,255,0.3); padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">${item.savings}</span>
                        </div>
                        <small style="display: block; margin-top: 6px;">⭐ ${item.rating} | ${item.reviewCount.toLocaleString()} reviews</small>
                    </div>
                    <button onclick='viewProduct(${JSON.stringify(item).replace(/'/g, "&#39;")})' style="width: 100%; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.9); color: #4f46e5; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Compare Now
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== Wishlist Functions =====
function toggleWishlist(product) {
    if (!localStorage.getItem('isLoggedIn')) {
        alert('⚠️ Please login to save products');
        return;
    }
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.find(p => p.id === product.id);
    
    if (exists) {
        wishlist = wishlist.filter(p => p.id !== product.id);
        alert('❌ Removed from wishlist');
    } else {
        wishlist.push(product);
        alert('✅ Added to wishlist');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ===== Navigation Functions =====
function navigateTo(page) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('⚠️ Please login first');
        window.location.href = 'login.html';
        return;
    }
    
    window.location.href = `${page}.html`;
}
