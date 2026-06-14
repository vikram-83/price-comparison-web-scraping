# 🚀 PriceCompare - Setup & Running Guide

## 📋 Project Structure

```
price comparison web scraping/
├── backend/
│   └── node/
│       ├── server.js          ✅ Main server file
│       ├── middleware/
│       ├── routes/
│       └── services/
├── frontend/
│   ├── index.html             ✅ Main dashboard (after login)
│   ├── login.html             ✅ Login page (starts here)
│   ├── register.html          ✅ Registration page
│   ├── about.html             ✅ About page
│   ├── review.html            ✅ Reviews page
│   ├── product.html           ✅ Product detail page
│   ├── style.css              ✅ Main styles
│   ├── auth.css               ✅ Auth pages styles
│   ├── pages.css              ✅ Other pages styles
│   ├── auth-system.js         ✅ Authentication system (NEW)
│   └── script.js              ✅ Main scripts
└── config/
    └── settings.py
```

---

## 🔐 Test Credentials

```
📧 Email:    vikramchaudhari834@gmail.com
🔑 Password: vikram.81
```

---

## 🛠️ How to Run the Project

### Step 1: Install Dependencies

```bash
cd backend/node
npm install
```

### Step 2: Start the Server

```bash
node server.js
```

You should see:
```
🚀 Server running on http://localhost:3000
📱 Open http://localhost:3000 in your browser

📝 Test Credentials:
   Email: vikramchaudhari834@gmail.com
   Password: vikram.81
```

### Step 3: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

---

## 📱 User Flow

### 1️⃣ **Login Page** (First Page)
   - URL: `http://localhost:3000`
   - Enter credentials:
     - Email: `vikramchaudhari834@gmail.com`
     - Password: `vikram.81`
   - Click "Sign In" button

### 2️⃣ **Dashboard** (After Login)
   - URL: `http://localhost:3000/index.html`
   - Full navigation menu in header
   - Search for products
   - View wishlist and alerts

### 3️⃣ **Navigation Menu** (Available after login)
   - 🏠 **Home** → index.html
   - 📦 **Products** → product.html
   - ⭐ **Reviews** → review.html
   - ℹ️ **About** → about.html
   - 🚪 **Logout** → Back to login

---

## 🔄 Authentication Flow

```
┌─────────────────────────────┐
│   Browser Opens             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Load login.html           │
│   Check: isLoggedIn = false │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   User Enters Credentials   │
│   Email & Password          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Validate in auth-system.js│
│   Compare with hardcoded    │
│   credentials               │
└──────────────┬──────────────┘
               │
         ┌─────┴─────┐
         │           │
         ▼           ▼
    ✅ Valid    ❌ Invalid
         │           │
         │           ├─► Show Error Alert
         │           │
         │           └─► Clear Form
         │
         ▼
   localStorage.setItem(
     'isLoggedIn', 'true'
   )
         │
         ▼
   Redirect to index.html
         │
         ▼
   Show Dashboard with
   Navigation Menu
```

---

## 📄 Files Changed/Created

### ✅ **New Files Created:**
- `frontend/auth-system.js` - Authentication logic
- `frontend/login.html` - Login page (updated)
- `frontend/register.html` - Registration page (updated)
- `frontend/about.html` - About page (updated)
- `frontend/review.html` - Reviews page (updated)
- `frontend/product.html` - Product page (updated)
- `frontend/auth.css` - Auth pages styling
- `frontend/pages.css` - Pages styling
- `backend/node/server.js` - Server (updated)

### 📝 **Key Updates:**

#### **server.js**
- Now serves `login.html` as default page
- Added console logs for testing credentials

#### **auth-system.js** (NEW)
- Stores valid credentials
- Validates login
- Manages localStorage for user session
- Handles redirect logic
- Manages logout

#### **All HTML Files**
- Added `auth-system.js` script
- Updated navigation menus
- Added logout button

---

## 🧪 Testing Checklist

- [ ] Run `node server.js`
- [ ] Open `http://localhost:3000`
- [ ] See login page
- [ ] Enter email: `vikramchaudhari834@gmail.com`
- [ ] Enter password: `vikram.81`
- [ ] Click "Sign In"
- [ ] See dashboard with full navigation
- [ ] Click on "Products" link
- [ ] Click on "Reviews" link
- [ ] Click on "About" link
- [ ] Click "Logout" button
- [ ] Redirected back to login page

---

## 💾 LocalStorage Data

When logged in, the following data is stored:

```javascript
localStorage = {
  isLoggedIn: 'true',
  userEmail: 'vikramchaudhari834@gmail.com',
  userName: 'vikramchaudhari834',
  loginTime: '1718365200000'
}
```

---

## 🔧 Troubleshooting

### ❌ Problem: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### ❌ Problem: "Cannot find module 'express'"

**Solution:**
```bash
cd backend/node
npm install express cors
```

### ❌ Problem: Login not working

**Solution:**
1. Check email: `vikramchaudhari834@gmail.com`
2. Check password: `vikram.81`
3. Open DevTools (F12) → Console
4. Check for any JavaScript errors

### ❌ Problem: Stuck on login page after "Sign In"

**Solution:**
1. Clear browser cache: `Ctrl+Shift+Del`
2. Clear localStorage: `localStorage.clear()` in console
3. Refresh page
4. Try again

---

## 📊 Project Features

✅ **Login/Register System**
✅ **Protected Pages** (Auto-redirect if not logged in)
✅ **Navigation Menu** (Available after login)
✅ **Responsive Design** (Works on mobile, tablet, desktop)
✅ **Modern CSS** (No Tailwind - Pure CSS)
✅ **Product Comparison** (Multiple platforms)
✅ **Reviews System** (Customer feedback)
✅ **Price History** (Track price changes)
✅ **Wishlist Management**
✅ **Price Drop Alerts**

---

## 🎯 Next Steps (Optional Enhancements)

1. **Connect to Real Backend API**
   - Update `API_BASE` in script.js
   - Implement JWT tokens
   - Add database integration

2. **Add Email Verification**
   - Send verification email on register
   - Confirm email before login

3. **Add OAuth Integration**
   - Google OAuth
   - Facebook OAuth
   - GitHub OAuth

4. **Add Payment Gateway**
   - Razorpay / Stripe integration
   - Handle transactions

5. **Add Notifications**
   - Price drop alerts
   - Email notifications
   - SMS notifications

---

## 📞 Support

If you face any issues:
1. Check the troubleshooting section above
2. Check browser console (F12)
3. Check Node console for server errors
4. Make sure all files are in correct locations

---

**Happy coding! 🚀**

Made with ❤️ for PriceCompare
