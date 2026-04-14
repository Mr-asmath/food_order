# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running (local or Atlas URL)

### Step 1: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/food_order
PORT=5000
JWT_SECRET=supersecretkey123
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### Step 2: Setup Frontend

In a new terminal:
```bash
cd frontend
npm install
npm start
```

### Step 3: Seed Database (Optional)

1. Open MongoDB Compass or mongosh
2. Connect to your database
3. Go to 'food_order' database
4. Copy and paste the insert commands from `SEED_DATA.js`
5. Refresh the app to see foods

## 📱 Features to Test

1. Browse foods on home page
2. Filter by category (Pizza, Burger, Biryani, Dessert)
3. Add items to cart
4. Create account at login page
5. Place an order
6. View order history

## 🛠 Common Issues

| Issue | Solution |
|-------|----------|
| Can't connect to MongoDB | Make sure MongoDB is running or update MONGODB_URI in .env |
| Frontend can't reach backend | Check proxy in frontend/package.json and backend is on port 5000 |
| Port 3000 or 5000 in use | Change PORT in .env or use different ports |
| Authentication errors | Clear localStorage, try registering a new account |

## 📚 API Testing

Use Postman or curl to test APIs:

```bash
# Register user
POST http://localhost:5000/api/users/register
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}

# Get all foods
GET http://localhost:5000/api/foods

# Create order
POST http://localhost:5000/api/orders
{
  "userId": "USER_ID",
  "items": [{"foodId": "FOOD_ID", "quantity": 1}],
  "userDetails": {...}
}
```

## 📖 Next Steps

- Explore the code structure
- Modify the styling
- Add more foods to database
- Implement payment gateway
- Add more features!

Happy coding! 🎉
