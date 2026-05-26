const API_BASE = 'https://price-comparison-web-scraping.onrender.com/api';
let currentUser = null;
let currentProduct = null;
let currentToken = localStorage.getItem('priceCompareToken');

window.addEventListener('load', () => {
    if (currentToken) {
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
    const query = document.getElementById('search').value.trim();
    if (!query) return alert('Please type a product name');

    document.getElementById('statusMessage').textContent = `Searching for “${query}”...`;
    const result = await sendRequest(`/search?q=${encodeURIComponent(query)}`, 'GET', null, false);
    if (result.error) {
        document.getElementById('statusMessage').textContent = 'Search failed. Try again.';
        return;
    }

    renderSearchResults(result);
    document.getElementById('statusMessage').textContent = `Top results for “${query}”`;
    if (currentToken) fetchProfile();
}

function renderSearchResults(items) {
    const results = document.getElementById('results');
    if (!items.length) {
        results.innerHTML = '<div class="empty-state">No matching products found. Try another keyword.</div>';
        return;
    }

    results.innerHTML = items.map(product => `
        <article class="product-card ${product.bestDeal ? 'best-deal' : ''}">
            <div class="card-top">
                <img src="${getProductImage(product)}" alt="${product.site} product" />
                <span class="badge">${product.site}</span>
            </div>
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="description">${product.description || 'A smart choice with live price tracking and rating history.'}</p>
                <div class="price-row">
                    <strong>${product.priceTag}</strong>
                    <span>${product.savings}</span>
                </div>
                <div class="meta-row">
                    <span>⭐ ${product.rating} (${product.reviewCount} reviews)</span>
                    ${product.lowestPrice ? '<span class="pill">Lowest Price</span>' : ''}
                </div>
                <div class="actions">
                    <button onclick='viewProduct(${JSON.stringify(product)})'>View Details</button>
                    <button class="ghost" onclick='toggleWishlist(${JSON.stringify(product)})'>Save</button>
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
    const reviewsResult = await sendRequest(`/products/reviews/${product.productId}`, 'GET', null, false);
    const reviewHtml = reviewsResult.reviews.slice(0, 3).map(review => `
        <div class="review-block ${review.fake ? 'warning' : ''}">
            <strong>${review.author}</strong>
            <span>${review.rating} ⭐</span>
            <p>${review.comment}</p>
            <small>${review.sentiment}${review.fake ? ' • Possible fake review' : ''}</small>
        </div>
    `).join('');

    document.getElementById('detailContent').innerHTML = `
        <header class="detail-header">
            <img src="${getProductImage(product)}" alt="${product.name}" />
            <div>
                <h2>${product.name}</h2>
                <p>${product.description || 'Full product overview with price charts, reviews, and alerts.'}</p>
                <p class="detail-price">${product.priceTag}</p>
                <div class="detail-badges">
                    <span>${product.site}</span>
                    <span>Rating ${product.rating}</span>
                    <span>${product.savings}</span>
                </div>
                <a href="${product.link}" target="_blank" class="button">View on ${product.site}</a>
            </div>
        </header>
        <section class="history-section">
            <h3>Price History</h3>
            ${renderHistoryChart(product.priceHistory || [])}
        </section>
        <section class="review-section">
            <div class="section-header">
                <h3>User Reviews</h3>
                <button onclick="openReviewForm('${product.productId}')">Submit Review</button>
            </div>
            ${reviewHtml}
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

async function loadRecommendations() {
    const result = await sendRequest('/products/recommendations?budget=50000', 'GET', null, false);
    if (!result.recommendations) return;
    document.getElementById('recommendationSummary').innerHTML = result.recommendations.map(item => `
        <div class="recommendation-card">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <small>${item.callouts.join(' • ')}</small>
        </div>
    `).join('');
}
