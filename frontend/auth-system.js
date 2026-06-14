// ===== Authentication System =====

const VALID_CREDENTIALS = {
    email: 'vikramchaudhari834@gmail.com',
    password: 'vikram.81'
};

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in and trying to access protected pages, redirect to login
    if (!isLoggedIn && (currentPage.includes('index.html') || currentPage === '/')) {
        window.location.href = 'login.html';
    }
});

// ===== Login Handler =====
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate credentials
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        // Set logged in status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('loginTime', new Date().getTime());
        
        // Show success message
        alert('✓ Login successful! Redirecting to dashboard...');
        
        // Redirect to main page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        alert('❌ Invalid email or password!\n\nCorrect credentials:\nEmail: vikramchaudhari834@gmail.com\nPassword: vikram.81');
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
}

// ===== Register Handler =====
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert('❌ Please fill all fields');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match');
        return;
    }
    
    // For demo, you can auto-login or show success message
    alert('✓ Account created successfully!\n\nYou can now login with your credentials.\n\nRedirecting to login page...');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// ===== Logout Handler =====
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginTime');
    
    alert('✓ Logged out successfully!');
    window.location.href = 'login.html';
}

// ===== Get Current User =====
function getCurrentUser() {
    return {
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName'),
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
}

// ===== Show User Info in Header =====
function updateHeaderWithUserInfo() {
    const user = getCurrentUser();
    
    if (user.isLoggedIn) {
        // Update navigation with logout button
        const nav = document.querySelector('nav');
        if (nav) {
            nav.innerHTML = `
                <a href="index.html" class="nav-link">Home</a>
                <a href="about.html" class="nav-link">About</a>
                <a href="review.html" class="nav-link">Reviews</a>
                <a href="product.html" class="nav-link">Products</a>
                <span style="color: #6b7280;">|</span>
                <span style="color: #4b5563; margin: 0 8px;">👤 ${user.name}</span>
                <button class="ghost" onclick="logout()">Logout</button>
            `;
        }
    }
}

// ===== Social Login Placeholders =====
function googleLogin() {
    alert('🔐 Google Login - Demo Mode\n\nIn production, this would use Google OAuth.');
}

function facebookLogin() {
    alert('🔐 Facebook Login - Demo Mode\n\nIn production, this would use Facebook OAuth.');
}

// ===== Navigation =====
function navigateTo(page) {
    const user = getCurrentUser();
    
    if (!user.isLoggedIn && page !== 'login' && page !== 'register') {
        alert('⚠️ Please login first');
        window.location.href = 'login.html';
        return;
    }
    
    window.location.href = `${page}.html`;
}

// Update header when page loads
document.addEventListener('DOMContentLoaded', updateHeaderWithUserInfo);
