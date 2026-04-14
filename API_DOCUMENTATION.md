# 🔌 Food Order API Documentation

**Base URL:** `http://localhost:5000/api`

---

## 👤 User Endpoints

### Register User
```
POST /users/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Error (400):
{
  "message": "User already exists"
}
```

### Login User
```
POST /users/login

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Error (400):
{
  "message": "Invalid credentials"
}
```

### Get User Details
```
GET /users/:id

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "123 Main Street, City",
  "createdAt": "2024-01-15T10:30:00Z"
}

Error (404):
{
  "message": "User not found"
}
```

### Update User
```
PUT /users/:id

Request Body:
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": "456 Oak Avenue, City"
}

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "456 Oak Avenue, City"
}
```

### Delete User
```
DELETE /users/:id

Response (200):
{
  "message": "User deleted successfully"
}
```

---

## 🍕 Food Endpoints

### Get All Foods
```
GET /foods

Response (200):
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato and mozzarella",
    "price": 250,
    "category": "Pizza",
    "image": "https://via.placeholder.com/300",
    "available": true,
    "rating": 4.8,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Cheese Burger",
    "description": "Juicy burger with melted cheese",
    "price": 150,
    "category": "Burger",
    "image": "https://via.placeholder.com/300",
    "available": true,
    "rating": 4.5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Foods by Category
```
GET /foods/category/:category

Example: GET /foods/category/Pizza

Response (200):
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato and mozzarella",
    "price": 250,
    "category": "Pizza",
    "image": "https://via.placeholder.com/300",
    "available": true,
    "rating": 4.8
  }
]

Available Categories:
- Pizza
- Burger
- Biryani
- Dessert
```

### Get Single Food
```
GET /foods/:id

Example: GET /foods/64a1b2c3d4e5f6g7h8i9j0k1

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 250,
  "category": "Pizza",
  "image": "https://via.placeholder.com/300",
  "available": true,
  "rating": 4.8,
  "createdAt": "2024-01-15T10:30:00Z"
}

Error (404):
{
  "message": "Food not found"
}
```

### Add New Food (Admin Only)
```
POST /foods

Request Body:
{
  "name": "Veggie Pizza",
  "description": "Pizza with fresh vegetables",
  "price": 200,
  "category": "Pizza",
  "image": "https://via.placeholder.com/300",
  "available": true,
  "rating": 4.6
}

Response (201):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k5",
  "name": "Veggie Pizza",
  "description": "Pizza with fresh vegetables",
  "price": 200,
  "category": "Pizza",
  "image": "https://via.placeholder.com/300",
  "available": true,
  "rating": 4.6,
  "createdAt": "2024-01-20T12:00:00Z"
}
```

### Update Food (Admin Only)
```
PUT /foods/:id

Request Body:
{
  "price": 230,
  "available": false
}

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 230,
  "category": "Pizza",
  "available": false,
  "rating": 4.8
}
```

### Delete Food (Admin Only)
```
DELETE /foods/:id

Response (200):
{
  "message": "Food deleted successfully"
}
```

---

## 📦 Order Endpoints

### Create Order
```
POST /orders

Request Body:
{
  "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "items": [
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "quantity": 2
    },
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k2",
      "quantity": 1
    }
  ],
  "userDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street, City"
  }
}

Response (201):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k10",
  "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "items": [
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Margherita Pizza",
      "price": 250,
      "quantity": 2,
      "subtotal": 500
    },
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Cheese Burger",
      "price": 150,
      "quantity": 1,
      "subtotal": 150
    }
  ],
  "totalPrice": 650,
  "userDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street, City"
  },
  "status": "pending",
  "paymentStatus": "pending",
  "createdAt": "2024-01-20T14:30:00Z",
  "updatedAt": "2024-01-20T14:30:00Z"
}
```

### Get User Orders
```
GET /orders/user/:userId

Example: GET /orders/user/64a1b2c3d4e5f6g7h8i9j0k1

Response (200):
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k10",
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [...],
    "totalPrice": 650,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-20T14:30:00Z"
  },
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k11",
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [...],
    "totalPrice": 400,
    "status": "delivered",
    "paymentStatus": "completed",
    "createdAt": "2024-01-19T12:00:00Z"
  }
]
```

### Get All Orders (Admin Only)
```
GET /orders

Response (200):
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k10",
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [...],
    "status": "pending"
  },
  ...
]
```

### Get Single Order
```
GET /orders/:id

Example: GET /orders/64a1b2c3d4e5f6g7h8i9j0k10

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k10",
  "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "items": [
    {
      "foodId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Margherita Pizza",
      "price": 250,
      "quantity": 2,
      "subtotal": 500
    }
  ],
  "totalPrice": 650,
  "userDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street, City"
  },
  "status": "pending",
  "paymentStatus": "pending",
  "createdAt": "2024-01-20T14:30:00Z"
}
```

### Update Order Status (Admin Only)
```
PUT /orders/:id

Request Body:
{
  "status": "preparing",
  "paymentStatus": "completed"
}

Available Status Values:
- pending
- confirmed
- preparing
- ready
- delivered
- cancelled

Available Payment Status:
- pending
- completed
- failed

Response (200):
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k10",
  "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "items": [...],
  "totalPrice": 650,
  "status": "preparing",
  "paymentStatus": "completed",
  "updatedAt": "2024-01-20T15:45:00Z"
}
```

### Delete Order (Admin Only)
```
DELETE /orders/:id

Response (200):
{
  "message": "Order deleted successfully"
}
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## 🔑 Authentication

The API uses JWT (JSON Web Token) for authentication.

### Getting a Token

1. Register or Login to get a token
2. Token is valid for 7 days
3. Store token in browser localStorage

### Using Token (Future Enhancement)

```javascript
// In axios interceptor
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

## 🧪 Example API Calls with Curl

### Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "password": "pass123"
  }'
```

### Get All Foods
```bash
curl http://localhost:5000/api/foods
```

### Get Foods by Category
```bash
curl http://localhost:5000/api/foods/category/Pizza
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [{"foodId": "64a1b2c3d4e5f6g7h8i9j0k1", "quantity": 1}],
    "userDetails": {
      "name": "John",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main St"
    }
  }'
```

---

## 🛡️ Error Handling

All errors follow this format:

```javascript
{
  "message": "Descriptive error message"
}
```

Common errors:
- `"User already exists"` - Email already registered
- `"Invalid credentials"` - Wrong email or password
- `"Food not found"` - Invalid food ID
- `"Order not found"` - Invalid order ID

---

## 🚀 Best Practices

1. ✅ Always send `Content-Type: application/json` header
2. ✅ Validate input before sending requests
3. ✅ Handle all error cases in frontend
4. ✅ Store JWT token securely
5. ✅ Use try-catch blocks for API calls
6. ✅ Show loading states while fetching

---

**API Version:** 1.0.0  
**Last Updated:** January 2024
