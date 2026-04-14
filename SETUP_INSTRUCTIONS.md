# MERN Food Order App - Complete Setup Instructions

## 📋 Complete System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   PostgreSQL        MongoDB         │
│              (Alternative DB)      (Main DB)        │
└────────────────┬──────────────────────┬─────────────┘
                 │                      │
                 └──────────┬───────────┘
                            │
        ┌───────────────────▼───────────────────┐
        │         Node.js + Express Server      │
        │         (Backend API - Port 5000)     │
        ├─────────────────────────────────────────┤
        │   Routes: /api/foods                   │
        │           /api/users                   │
        │           /api/orders                  │
        └──────────────────┬─────────────────────┘
                           │ HTTP/REST
        ┌──────────────────▼──────────────────────┐
        │      React App (Frontend - Port 3000)   │
        ├──────────────────────────────────────────┤
        │  Components:                             │
        │  - Header (Navigation)                   │
        │  - Home (Food Listing)                   │
        │  - FoodCard (Individual Food Display)    │
        │  - Cart (Shopping Cart)                  │
        │  - Orders (Order History)                │
        │  - Auth (Login/Register)                 │
        └──────────────────────────────────────────┘
```

## 🛠 Complete Installation From Scratch

### 1. Create Project Folders

```bash
# Create main folder
mkdir food_order
cd food_order

# Create subfolders
mkdir backend frontend
```

### 2. Backend Setup (Complete Steps)

#### 2.1 Initialize Backend Project

```bash
cd backend

# Initialize npm
npm init -y

# Install all dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken axios

# Install dev dependencies
npm install --save-dev nodemon
```

#### 2.2 Create Directory Structure

```bash
mkdir models controllers routes

# Create server file
touch server.js .env .env.example
```

#### 2.3 Update package.json Scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

#### 2.4 Create All Backend Files

Copy the content from the generated backend files into:
- `server.js` - Main server file
- `.env.example` - Environment template
- `models/Food.js` - Food model
- `models/User.js` - User model
- `models/Order.js` - Order model
- `controllers/foodController.js` - Food logic
- `controllers/userController.js` - User logic
- `controllers/orderController.js` - Order logic
- `routes/foodRoutes.js` - Food routes
- `routes/userRoutes.js` - User routes
- `routes/orderRoutes.js` - Order routes

#### 2.5 Setup Environment Variables

```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your values
```

Contents of `.env`:
```
MONGODB_URI=mongodb://localhost:27017/food_order
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_order

PORT=5000
JWT_SECRET=your_very_secret_key_change_this
NODE_ENV=development
```

### 3. Frontend Setup (Complete Steps)

```bash
cd frontend

# Create React app
npx create-react-app . 2>/dev/null || npm init -y

# Install dependencies
npm install react-router-dom axios

# Or if using create-react-app:
# npx create-react-app .
```

#### 3.2 Update package.json

Add proxy for backend:
```json
"proxy": "http://localhost:5000",
```

### 4. Database Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB Community
# Windows: Download from https://www.mongodb.com/try/download/community

# Start MongoDB (Windows)
mongod

# Connect with MongoDB Compass or mongosh
mongosh
use food_order
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_order
```

### 5. Seed Sample Data

```bash
# In mongosh or MongoDB Compass, run:
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
  // ... more items from SEED_DATA.js
])
```

## 🚀 Running the Application

### Terminal 1: Start Backend

```bash
cd backend
npm run dev

# Expected output:
# Server running on http://localhost:5000
# MongoDB connected
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm start

# Expected output:
# App opens at http://localhost:3000
```

## 🧪 Testing the Application

### Test User Flow

1. Visit `http://localhost:3000`
2. Click "Login" in header
3. Click "Sign Up" to create account
4. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
5. Click "Create Account"
6. Browse foods on home page
7. Click "Add to Cart" on foods
8. Click cart icon to view cart
9. Click "Proceed to Checkout"
10. Click "My Orders" to see order

### Test API with Curl/Postman

```bash
# Register User
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "password": "password123"
  }'

# Get All Foods
curl http://localhost:5000/api/foods

# Get Foods by Category
curl http://localhost:5000/api/foods/category/Pizza

# Create Order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "items": [{"foodId": "FOOD_ID_HERE", "quantity": 2}],
    "userDetails": {
      "name": "John",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main St"
    }
  }'
```

## 📁 Project File Structure (Complete)

```
food_order/
│
├── backend/
│   ├── models/
│   │   ├── Food.js         # Food schema
│   │   ├── User.js         # User schema
│   │   └── Order.js        # Order schema
│   │
│   ├── controllers/
│   │   ├── foodController.js   # Food business logic
│   │   ├── userController.js   # User business logic
│   │   └── orderController.js  # Order business logic
│   │
│   ├── routes/
│   │   ├── foodRoutes.js   # /api/foods endpoints
│   │   ├── userRoutes.js   # /api/users endpoints
│   │   └── orderRoutes.js  # /api/orders endpoints
│   │
│   ├── server.js           # Express server entry point
│   ├── package.json
│   ├── .env                # Local environment (don't commit)
│   ├── .env.example        # Example for team
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── FoodCard.js
│   │   │   └── FoodCard.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js          # Food listing page
│   │   │   ├── Home.css
│   │   │   ├── Cart.js          # Shopping cart page
│   │   │   ├── Cart.css
│   │   │   ├── Orders.js        # Order history page
│   │   │   ├── Orders.css
│   │   │   ├── Auth.js          # Login/register page
│   │   │   └── Auth.css
│   │   │
│   │   ├── context/
│   │   │   ├── CartContext.js   # Cart state management
│   │   │   └── AuthContext.js   # Auth state management
│   │   │
│   │   ├── services/
│   │   │   └── api.js           # API service/axios config
│   │   │
│   │   ├── App.js               # Main App component
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   │
│   ├── package.json
│   └── .gitignore
│
├── README.md               # Complete documentation
├── QUICKSTART.md          # Quick start guide
├── SETUP_INSTRUCTIONS.md  # This file
├── SEED_DATA.js           # Sample data
└── .gitignore
```

## 🔐 Security Notes

⚠️ **Before Production:**

1. Change `JWT_SECRET` to a strong random string
2. Never commit `.env` file (use `.gitignore`)
3. Use HTTPS instead of HTTP
4. Add input validation and sanitization
5. Implement rate limiting
6. Use refresh tokens
7. Add CORS whitelist
8. Hash passwords (already done with bcryptjs)

## 🐛 Debugging Tips

### Backend Debugging

```bash
# Use nodemon with --inspect flag
node --inspect server.js

# Then open chrome://inspect in Chrome
```

### Frontend Debugging

1. Open Browser DevTools (F12)
2. Network tab: Monitor API calls
3. Console tab: Check JavaScript errors
4. React DevTools extension: Inspect components

### Common MongoDB Errors

```
MongoServerError: connect ECONNREFUSED
→ MongoDB not running. Start with 'mongod'

Error: connect ENOTFOUND
→ MONGODB_URI connection string wrong in .env
```

## 📚 API Response Format

All endpoints return JSON:

```javascript
// Success Response
{
  "status": 200,
  "data": { ... }
}

// Error Response
{
  "status": 400,
  "message": "Error description"
}

// Auth Response
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

## 🚀 Deployment (Optional)

### Backend Deployment on Heroku

```bash
cd backend

# Install Heroku CLI
# Create Heroku account and app
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Frontend Deployment on Vercel

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📞 Support

If you face issues:
1. Check MongoDB is running
2. Verify .env configuration
3. Clear browser cache
4. Check console for errors
5. Verify ports (3000, 5000) are not in use

## 🎓 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Your full MERN Food Order App is now ready! 🎉**
