# 🎬 Getting Started - Complete Video Guide

This document is a step-by-step walkthrough to get your Food Order App running.

## ⏱️ Total Time: 10-15 minutes

---

## Step 1️⃣: Prerequisites Check (2 min)

### ✅ Verify Node.js Installation
```bash
node --version    # Should show v14 or higher
npm --version     # Should show v6 or higher
```

If not installed, download from: https://nodejs.org/

### ✅ Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and keep running
- Or use `brew install mongodb-community` on Mac

**Option B: MongoDB Atlas (Cloud)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account
- Create a cluster
- Get connection string

---

## Step 2️⃣: Clone/Navigate to Project (1 min)

The project structure is already created at:
```
d:\program\node js\food_order\
```

### Check structure:
```bash
cd "d:\program\node js\food_order"
ls    # You should see: backend, frontend, README.md, etc.
```

---

## Step 3️⃣: Backend Setup (4 min)

### 3.1 Navigate to Backend
```bash
cd backend
```

### 3.2 Install Dependencies
```bash
npm install
```

Expected output:
```
added XXX packages in Ys
```

### 3.3 Create .env File

Create `backend/.env` with:
```
MONGODB_URI=mongodb://localhost:27017/food_order
PORT=5000
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas, use:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_order
```

### 3.4 Test Backend Start
```bash
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected
```

**Keep this terminal open!**

---

## Step 4️⃣: Frontend Setup (4 min)

### 4.1 Open New Terminal and Navigate
```bash
cd frontend
```

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Start Frontend
```bash
npm start
```

Expected output:
```
Compiled successfully!
On Your Network: http://...
Local:          http://localhost:3000
```

**App opens automatically in browser!**

---

## Step 5️⃣: Add Sample Data (2 min)

### 5.1 Open MongoDB

**If using local MongoDB:**
Open another terminal:
```bash
mongosh
```

**If using MongoDB Atlas:**
Use MongoDB Compass (GUI tool)

### 5.2 Seed Data

```javascript
// In mongosh or MongoDB Compass console
use food_order

db.foods.insertMany([
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato and mozzarella",
    price: 250,
    category: "Pizza",
    image: "https://via.placeholder.com/300",
    available: true,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Cheese Burger",
    description: "Juicy burger with melted cheese",
    price: 150,
    category: "Burger",
    image: "https://via.placeholder.com/300",
    available: true,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Biryani",
    description: "Fragrant Indian rice dish",
    price: 300,
    category: "Biryani",
    image: "https://via.placeholder.com/300",
    available: true,
    rating: 4.9,
    createdAt: new Date()
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate dessert",
    price: 200,
    category: "Dessert",
    image: "https://via.placeholder.com/300",
    available: true,
    rating: 4.7,
    createdAt: new Date()
  }
])
```

### 5.3 Verify Data
```javascript
db.foods.find()  // Should show 4 foods
```

### 5.4 Refresh Browser
Go back to http://localhost:3000 and refresh the page. You should see the foods!

---

## Step 6️⃣: Test the App (2 min)

### ✅ Test User Registration
1. Click **Login** button in header
2. Click **Sign Up**
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click **Create Account**
5. You should be logged in!

### ✅ Test Food Browsing
1. You're on the Home page
2. See all foods (if you seeded data)
3. Try filtering by category

### ✅ Test Shopping Cart
1. Click **Add to Cart** on a food
2. Click cart icon (shows count)
3. Click **Proceed to Checkout**
4. Click **My Orders** - should show pending order

### ✅ Test API with Postman
1. Download Postman: https://www.postman.com/
2. Test GET: `http://localhost:5000/api/foods`
3. Test POST: `http://localhost:5000/api/users/register`

---

## 📱 Using the App

### Home Page
```
URL: http://localhost:3000/

Features:
- Browse all foods
- Filter by category
- Add to cart
```

### Cart Page
```
URL: http://localhost:3000/cart

Features:
- View cart items
- Adjust quantities
- Calculate total
- Checkout
```

### Orders Page
```
URL: http://localhost:3000/orders

Features:
- View order history
- Check order status
```

### Login Page
```
URL: http://localhost:3000/auth

Features:
- Register new account
- Login existing account
```

---

## 🛠️ During Development

### Useful Commands

**Backend:**
```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

**Frontend:**
```bash
# Start development server
npm start

# Build for production
npm run build
```

---

## 🔍 Debugging

### Browser Console (Frontend)
1. Open Browser DevTools: **F12**
2. Go to **Console** tab
3. Check for JavaScript errors
4. Use `localStorage.getItem('token')` to check auth

### Network Tab
1. Go to **Network** tab
2. Make API calls
3. Check request/response
4. Verify status codes (200, 201, 400, 404, 500)

### Backend Logs
1. Check terminal running `npm run dev`
2. Look for:
   - `Server running on...`
   - `MongoDB connected`
   - API request logs
   - Error messages

### Database Check
```javascript
// In mongosh
use food_order
db.foods.countDocuments()      // Should show 4
db.users.countDocuments()      // Shows registered users
db.orders.countDocuments()     // Shows orders
```

---

## ❌ Troubleshooting

### "Cannot find module" Error
```bash
# Solution: Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Backend port 5000 in use:
# Edit backend/.env and change PORT=5001

# Frontend port 3000 in use:
npm start   # Will ask to use different port
```

### MongoDB Connection Refused
```
Error: connect ECONNREFUSED

Solutions:
1. Start MongoDB: mongod
2. Check MONGODB_URI in .env
3. For Atlas, verify network access is enabled
```

### CORS Error in Console
```
Error: Access to XMLHttpRequest blocked by CORS

Solutions:
1. Check backend is running on port 5000
2. Check proxy in frontend/package.json
3. Restart npm server
```

### Changes Not Reflecting
```
Solutions:
1. Hard refresh browser: Ctrl+Shift+R
2. Clear browser cache
3. Clear localStorage: 
   localStorage.clear()
```

### Lost Authentication After Refresh
```
Solutions:
1. Token is stored in localStorage
2. Check localStorage.getItem('token')
3. Try registering/logging in again
4. Check JWT_SECRET is same in .env
```

---

## 📚 File Navigation Guide

### Backend Files
```
backend/
├── server.js           # Main server - START HERE
├── package.json        # Dependencies
├── .env                # Configuration
│
├── models/
│   ├── Food.js        # Food database schema
│   ├── User.js        # User with password hashing
│   └── Order.js       # Order structure
│
├── controllers/
│   ├── foodController.js   # Food logic (GET/POST/PUT/DELETE)
│   ├── userController.js   # Auth logic (Register/Login)
│   └── orderController.js  # Order logic
│
└── routes/
    ├── foodRoutes.js       # Food endpoints
    ├── userRoutes.js       # User endpoints
    └── orderRoutes.js      # Order endpoints
```

### Frontend Files
```
frontend/src/
├── App.js              # Main App - START HERE
├── index.js            # React entry point
│
├── pages/
│   ├── Home.js         # Food listing page
│   ├── Cart.js         # Shopping cart page
│   ├── Orders.js       # Order history page
│   └── Auth.js         # Login/Register page
│
├── components/
│   ├── Header.js       # Navigation bar
│   └── FoodCard.js     # Food item component
│
├── context/
│   ├── CartContext.js  # Cart state
│   └── AuthContext.js  # Auth state
│
└── services/
    └── api.js          # API calls to backend
```

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────┐
│      User Browser (Frontend)        │
│   React App @ localhost:3000        │
│  ├─ Home (Food List)                │
│  ├─ Cart (Shopping)                 │
│  ├─ Orders (History)                │
│  └─ Auth (Login/Register)           │
└────────────┬──────────────────────┐
             │ HTTP Requests        │
             ▼                      │
┌─────────────────────────────────────┐
│   Node.js + Express Server          │
│   Backend API @ localhost:5000      │
│  ├─ /api/foods (Food routes)        │
│  ├─ /api/users (User routes)        │
│  └─ /api/orders (Order routes)      │
└────────────┬──────────────────────┘
             │ Database Queries
             ▼
    ┌──────────────────────┐
    │    MongoDB Database  │
    │  ├─ foods collection │
    │  ├─ users collection │
    │  └─ orders collection│
    └──────────────────────┘
```

---

## ✅ Verification Checklist

After setup, verify all working:

- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] MongoDB connected
- [ ] Can see foods on home page
- [ ] Can add foods to cart
- [ ] Can register new account
- [ ] Can login with account
- [ ] Can place order
- [ ] Can view order history
- [ ] API returns data in Network tab
- [ ] No console errors

---

## 🚀 You're Ready!

If all checkmarks are ✅, you have a **fully functional food ordering app**!

### Next Steps:
1. Explore the code
2. Make modifications
3. Add new features
4. Deploy to production
5. Build your portfolio

---

## 📞 Quick Reference

| What | Command |
|------|---------|
| Start Backend | `cd backend && npm run dev` |
| Start Frontend | `cd frontend && npm start` |
| Install Deps | `npm install` |
| Access App | `http://localhost:3000` |
| API Docs | See `API_DOCUMENTATION.md` |
| Sample Data | Use `SEED_DATA.js` |

---

**Congratulations! You now have a complete MERN Food Order Application! 🎉**

For more details, see:
- README.md - Full documentation
- API_DOCUMENTATION.md - API reference
- SETUP_INSTRUCTIONS.md - Detailed setup
- PROJECT_SUMMARY.md - Project overview

---

**Happy Coding! 🚀**
