# Employee Portal Feature Guide

## Overview
The Employee Portal is a complete management system for restaurant employees to add, edit, and manage food items. Employees can login separately from regular users and manage the entire food inventory through an intuitive dashboard.

## Features Implemented

### 1. Employee Authentication System
- **File**: `backend/models/Employee.js`
- Separate employee registration and login
- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access (admin/manager)

### 2. Employee Backend Routes & Controllers
- **Files**: 
  - `backend/controllers/employeeController.js`
  - `backend/routes/employeeRoutes.js`

#### Available Endpoints:
```
POST   /api/employees/register  - Register new employee
POST   /api/employees/login     - Login employee
GET    /api/employees/:id       - Get employee profile
PUT    /api/employees/:id       - Update employee
DELETE /api/employees/:id       - Delete employee
```

### 3. Employee Frontend Pages & Components
- **EmployeeAuth.js** - Login page with form validation
- **EmployeeDashboard.js** - Main dashboard for food management
- **EmployeeContext.js** - State management for employee data
- **CSS Files** - Professional styling with gradients and animations

### 4. Food Management Interface
The dashboard provides complete CRUD operations:

#### Features:
- ✅ **View All Foods** - Displays foods in a professional table
- ✅ **Add New Food** - Form to create new food items
- ✅ **Edit Food** - Modify existing food details
- ✅ **Delete Food** - Remove foods from database
- ✅ **Toggle Availability** - Mark foods as available/unavailable
- ✅ **Filter & Search** - By name, category, price

#### Food Fields:
- Name (required)
- Description (required)
- Category (Pizza, Burger, Biryani, Dessert)
- Price in ₹ (required)
- Rating (0-5 scale)
- Image URL
- Availability status

## How to Use

### For Employees - Login to Dashboard

1. **Access Employee Portal**
   - Click "🔑 Employee Portal" in the header
   - Or navigate to: `http://localhost:3000/employee`

2. **Login**
   - Email: Use your employee email
   - Password: Use your employee password
   - Click "Login"

3. **Dashboard Features**
   - After login, you'll see the food management dashboard
   - Click "📊 Dashboard" in header to access food management

### For Employees - Add a Food Item

1. Click **"+ Add New Food"** button
2. Fill in the form:
   - **Food Name**: e.g., "Margherita Pizza"
   - **Category**: Select from dropdown
   - **Price**: Enter in rupees (e.g., 250)
   - **Rating**: 0-5 scale (e.g., 4.5)
   - **Description**: Detailed description
   - **Image URL**: Link to food image
   - **Available**: Check to make available
3. Click **"Add Food"** button

### For Employees - Edit a Food Item

1. Locate the food in the table
2. Click **"Edit"** button
3. Modify the fields
4. Click **"Update Food"**

### For Employees - Delete a Food Item

1. Locate the food in the table
2. Click **"Delete"** button
3. Confirm deletion when prompted

## API Integration

### Frontend Service (api.js)
```javascript
// Add food
foodService.addFood(foodData)

// Get all foods
foodService.getAllFoods()

// Update food
foodService.updateFood(id, foodData)

// Delete food
foodService.deleteFood(id)
```

## Database Schema - Employee Model

```javascript
{
  id: INT (Primary Key),
  name: STRING (Required),
  email: STRING (Required, Unique),
  password: STRING (Hashed),
  role: ENUM (admin, manager) - Default: manager,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

## Security Features

✅ **Password Hashing**: bcryptjs with salt rounds
✅ **JWT Tokens**: Separate tokens for employees vs users
✅ **Protected Routes**: Dashboard only accessible with valid token
✅ **Role-Based Access**: Different permissions for admin/manager
✅ **localStorage**: Tokens stored in browser for session management

## Navigation Flow

```
Home Page
    ↓
🔑 Employee Portal (EmployeeAuth page)
    ↓
Employee Login Form
    ↓
✓ Login Success → 📊 Dashboard (EmployeeDashboard page)
    ↓
Food Management Interface
    - View all foods
    - Add new food
    - Edit existing food
    - Delete food
```

## File Structure

```
frontend/src/
├── pages/
│   ├── EmployeeAuth.js          (Login page)
│   ├── EmployeeAuth.css
│   ├── EmployeeDashboard.js     (Main dashboard)
│   ├── EmployeeDashboard.css
│
├── context/
│   └── EmployeeContext.js       (State management)
│
├── components/
│   └── Header.js (Updated)      (Added employee portal link)
│
└── services/
    └── api.js (Updated)         (employeeService endpoints)

backend/
├── models/
│   └── Employee.js              (Employee schema)
│
├── controllers/
│   └── employeeController.js    (Login/Register logic)
│
└── routes/
    └── employeeRoutes.js        (API endpoints)
```

## Testing the Employee Portal

### Using Postman/cURL:

#### 1. Register Employee
```bash
curl -X POST http://localhost:5000/api/employees/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Manager",
    "email": "john@restaurant.com",
    "password": "password123",
    "role": "manager"
  }'
```

#### 2. Login Employee
```bash
curl -X POST http://localhost:5000/api/employees/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@restaurant.com",
    "password": "password123"
  }'
```

#### 3. Add Food (with auth token)
```bash
curl -X POST http://localhost:5000/api/foods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_EMPLOYEE_TOKEN" \
  -d '{
    "name": "Margherita Pizza",
    "description": "Fresh mozzarella and basil",
    "price": 250,
    "category": "Pizza",
    "rating": 4.5,
    "image": "https://example.com/pizza.jpg",
    "available": true
  }'
```

## Troubleshooting

### Employee Portal Not Showing
- Clear browser cache (localStorage)
- Ensure EmployeeContext is properly imported
- Check Console for errors

### Login Failing
- Verify email is correct
- Ensure employee account exists in database
- Check password is correct
- Look at backend console for database errors

### Add Food Not Working
- Ensure employee is logged in
- Check if token is valid and not expired
- Verify all required fields are filled
- Check backend console for validation errors

### Foods Not Showing
- Refresh the page
- Check backend is running
- Verify database has foods
- Check network tab in DevTools for API errors

## Next Steps

1. **Add Quantity/Inventory Tracking**
   - Track remaining stock for each food
   - Alert when quantity is low

2. **Add Analytics Dashboard**
   - View most ordered items
   - Track sales by category
   - View employee performance

3. **Add Order Management**
   - View pending orders
   - Track order status
   - Update delivery status

4. **Enhance Permissions**
   - Implement role-based features
   - Admin vs Manager capabilities
   - Employee activity logs

## Support

For issues or questions, check:
1. Backend console for error messages
2. Browser DevTools -> Console tab
3. Network tab to see API responses
4. Database to verify data exists
