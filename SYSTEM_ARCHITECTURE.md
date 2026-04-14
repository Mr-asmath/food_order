# Complete System Architecture Guide

## System Overview

The Food Order App now has a complete role-based access system with three distinct user types, each with their own authentication and dashboard:

```
┌─────────────────────────────────────────────────────────┐
│               FOOD ORDER APPLICATION                     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │         HOME PAGE (All Users)                    │  │
│  │  - Browse Food Items                             │  │
│  │  - View Food Details                             │  │
│  └──────────────────────────────────────────────────┘  │
│           ↓ ↓ ↓                                          │
│  ┌─────────┬──────────┬─────────┐                       │
│  │         │          │         │                       │
│  │ CUSTOMER│ EMPLOYEE │  ADMIN  │                       │
│  │         │          │         │                       │
│  └────┬────┴────┬─────┴────┬────┘                       │
│       │         │          │                            │
│       ↓         ↓          ↓                            │
│    ┌──────┐ ┌──────────┐ ┌──────────────┐              │
│    │AUTH  │ │EMPLOYEE  │ │ADMIN         │              │
│    │PAGE  │ │AUTH PAGE │ │AUTH PAGE     │              │
│    └──┬───┘ └────┬─────┘ └────┬─────────┘              │
│       │          │            │                        │
│       ↓          ↓            ↓                        │
│    ┌────────┐┌──────────────┐┌─────────────────┐      │
│    │CUSTOMER││EMPLOYEE      ││ADMIN            │      │
│    │CART    ││DASHBOARD     ││DASHBOARD        │      │
│    │ORDERS  ││(Food Mgmt)   ││(Employee Mgmt)  │      │
│    └────────┘└──────────────┘└─────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## User Roles & Access

### 1. Customer
**What They Can Do:**
- View all food items
- Browse by category
- Add items to cart
- Place orders
- View order history
- Manage profile

**Authentication:**
- Users registration & login
- JWT token stored in localStorage
- Session expires in 7 days
- Token: `token`

**Dashboard:**
- Home page (food browsing)
- Cart page
- Orders page
- User profile

### 2. Employee
**What They Can Do:**
- Login to Employee Portal
- Manage food items (add, edit, delete)
- View all foods
- Toggle food availability
- Update food details (name, price, category, etc.)
- Cannot manage other employees

**Authentication:**
- Employee registration & login
- Separate from customer authentication
- JWT token stored in localStorage
- Session expires in 7 days
- Token: `employeeToken`

**Dashboard:**
- Employee Dashboard (main interface)
- Food Management (table view)
- Add/Edit/Delete Foods Form
- Logout button

### 3. Admin
**What They Can Do:**
- Login to Admin Portal
- Manage employees (add, edit, delete)
- View all employee accounts
- Assign roles to employees
- Manage admin accounts
- Full control over employee system

**Authentication:**
- Admin registration & login
- Completely separate from other systems
- JWT token stored in localStorage
- Session expires in 7 days
- Token: `adminToken`

**Dashboard:**
- Admin Dashboard (main interface)
- Employee Management (table view)
- Add/Edit/Delete Employees Form
- Assign employee roles
- View employee details

## Authentication Flow

### Customer Authentication
```
Customer → Auth Page → Register/Login → Cart Context & Auth Context
                     ↓
          JWT Token stored in localStorage
                     ↓
          Redirect to Home/Orders/Cart
```

### Employee Authentication
```
Employee → Employee Auth Page → Register/Login → Employee Context
                               ↓
               JWT Token stored in localStorage
                               ↓
              Redirect to Employee Dashboard
```

### Admin Authentication
```
Admin → Admin Auth Page → Register/Login → Admin Context
                         ↓
         JWT Token stored in localStorage
                         ↓
        Redirect to Admin Dashboard
```

## API Endpoints Summary

### Customer/User Endpoints
```
POST   /api/users/register       - User registration
POST   /api/users/login          - User login
GET    /api/users/:id            - Get user profile
PUT    /api/users/:id            - Update user
DELETE /api/users/:id            - Delete user
```

### Food Endpoints
```
GET    /api/foods                - Get all foods
GET    /api/foods/:id            - Get single food
POST   /api/foods                - Create food (employee)
PUT    /api/foods/:id            - Update food (employee)
DELETE /api/foods/:id            - Delete food (employee)
GET    /api/foods/category/:cat  - Get by category
```

### Order Endpoints
```
POST   /api/orders               - Create order
GET    /api/orders/user/:userId  - Get user orders
GET    /api/orders/:id           - Get order details
PUT    /api/orders/:id           - Update order status
DELETE /api/orders/:id           - Delete order
GET    /api/orders               - Get all orders (admin)
```

### Employee Endpoints
```
POST   /api/employees/register   - Employee registration
POST   /api/employees/login      - Employee login
GET    /api/employees/:id        - Get employee profile
PUT    /api/employees/:id        - Update employee
DELETE /api/employees/:id        - Delete employee
GET    /api/employees            - Get all employees
```

### Admin Endpoints
```
POST   /api/admins/register               - Admin registration
POST   /api/admins/login                  - Admin login
GET    /api/admins/:id                    - Get admin profile
GET    /api/admins/employees/list/all     - Get all employees
GET    /api/admins/employees/:id          - Get single employee
POST   /api/admins/employees/add          - Add employee
PUT    /api/admins/employees/:id          - Update employee
DELETE /api/admins/employees/:id          - Delete employee
```

## Database Schema

### Users Table
- id (PK)
- name
- email (unique)
- password (hashed)
- createdAt
- updatedAt

### Employees Table
- id (PK)
- name
- email (unique)
- password (hashed)
- role (manager, admin)
- createdAt
- updatedAt

### Admins Table
- id (PK)
- name
- email (unique)
- password (hashed)
- role (superadmin, admin)
- createdAt
- updatedAt

### Foods Table
- id (PK)
- name
- description
- price
- category
- image
- available (boolean)
- rating
- createdAt
- updatedAt

### Orders Table
- id (PK)
- userId (FK to Users)
- items (JSON format)
- totalPrice
- status
- createdAt
- updatedAt

## Frontend Structure

### Context Providers (App.js)
```
AdminContext (outermost)
  ↓
EmployeeContext
  ↓
AuthContext
  ↓
CartContext (innermost)
```

### Pages
- Home.js - Food browsing
- Cart.js - Shopping cart
- Orders.js - Order history
- Auth.js - Customer login/register
- EmployeeAuth.js - Employee login/register
- EmployeeDashboard.js - Food management
- AdminAuth.js - Admin login/register
- AdminDashboard.js - Employee management

### Components
- Header.js - Navigation with role-based links
- FoodCard.js - Individual food display
- EmployeeHeader.js - Employee dashboard header
- AddFoodForm.js - Food add/edit form

### Services
- api.js - Axios configuration with all services
  - foodService
  - orderService
  - userService
  - employeeService
  - adminService

## Backend Structure

### Models
- User.js
- Food.js
- Order.js
- Employee.js
- Admin.js

### Controllers
- userController.js
- foodController.js
- orderController.js
- employeeController.js
- adminController.js

### Routes
- userRoutes.js
- foodRoutes.js
- orderRoutes.js
- employeeRoutes.js
- adminRoutes.js

### Configuration
- database.js - SQLite connection & setup
- server.js - Express server main file

## Security Layers

1. **Password Hashing**
   - bcryptjs with 10 salt rounds
   - Applied to: Users, Employees, Admins

2. **JWT Tokens**
   - Separate tokens for each role
   - 7-day expiration
   - Stored in localStorage

3. **Email Validation**
   - Unique per role (user, employee, admin)
   - Format validation
   - No duplicate registrations

4. **Role-Based Routes**
   - Only authenticated users access protected routes
   - Employees cannot access admin features
   - Customers cannot access employee/admin features

5. **Token Verification**
   - Backend checks token validity
   - Expired tokens rejected
   - Invalid tokens cause re-login

## Navigation Rules

### From Home Page
- Customers: Cart → Orders → Auth
- Employees: Click "Employee Portal" button
- Admins: Click "Admin Portal" button

### While Logged In As Customer
- Can see: Home, Cart, Orders, Logout
- Cannot see: Employee/Admin portals

### While Logged In As Employee
- Can see: Dashboard (food management), Logout
- Cannot see: Cart, Orders, User features, Admin portal

### While Logged In As Admin
- Can see: Admin Panel (employee management), Logout
- Cannot see: Cart, Orders, Food management, User features

### Logout Behavior
- Clears respective token from localStorage
- Redirects to home page
- Session data cleaned
- Must re-login for same features

## Example User Journeys

### Customer Journey
1. Open home page → see foods
2. Click "Login" → Auth page
3. Register with email/password
4. Login successful → redirected to home
5. Add items to cart → view cart
6. Checkout → create order
7. View past orders → Order history
8. Click logout → cleared session

### Employee Journey
1. Open home page
2. Click "Employee Portal"
3. Login/Register with credentials
4. Redirected to Employee Dashboard
5. See all foods in table
6. Click "+ Add New Food"
7. Fill form → submit → food added
8. Edit/delete foods as needed
9. Click logout → cleared session

### Admin Journey
1. Open home page
2. Click "Admin Portal"
3. Login/Register with credentials
4. Redirected to Admin Dashboard
5. See all employees in table
6. Click "+ Add New Employee"
7. Fill form → submit → employee added
8. Edit/delete employees as needed
9. Assign roles to employees
10. Click logout → cleared session

## Key Features by Role

| Feature | Customer | Employee | Admin |
|---------|----------|----------|-------|
| Browse Foods | ✓ | ✓ | ✗ |
| Add To Cart | ✓ | ✗ | ✗ |
| Place Orders | ✓ | ✗ | ✗ |
| View Orders | ✓ | ✗ | ✗ |
| Manage Foods | ✗ | ✓ | ✗ |
| View Foods | ✗ | ✓ | ✗ |
| Manage Employees | ✗ | ✗ | ✓ |
| View Employees | ✗ | ✗ | ✓ |
| Assign Roles | ✗ | ✗ | ✓ |

## Technology Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- CSS3 (with gradients & animations)

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- SQLite3
- bcryptjs
- JWT (jsonwebtoken)

**Database:**
- SQLite (file-based, no server needed)

**Security:**
- Password hashing (bcryptjs)
- JWT authentication
- Email validation
- Unique constraints

## Installation & Setup

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# App opens on http://localhost:3000
```

### Database
- Automatically created on first run
- SQLite file: `backend/database.sqlite`
- Tables auto-synced with models

## Common Tasks

### Add First Admin
```
1. Go to /admin
2. Click "Register"
3. Fill admin details
4. Click Register
5. Login with created account
```

### Add First Employee
```
1. Login as Admin
2. Go to Admin Dashboard
3. Click "+ Add New Employee"
4. Fill employee details
5. Select role (manager/admin)
6. Click Add
7. Employee can now login at /employee
```

### Employee Add Food
```
1. Login as Employee
2. Go to Employee Dashboard
3. Click "+ Add New Food"
4. Fill all food details
5. Click Add Food
6. Food visible to customers
```

### Testing Full Flow
1. Create admin account
2. Create 2 employees via admin
3. Login as employees, add foods
4. Create customer account
5. Logout, browse foods as customer
6. Add to cart and checkout

## Troubleshooting Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] SQLite database exists
- [ ] All npm packages installed
- [ ] No console errors
- [ ] Tokens stored in localStorage
- [ ] Database has data
- [ ] API endpoints responding

## Next Enhancement Ideas

1. **Statistics Dashboard** - Sales, orders, employee performance
2. **Email Notifications** - Order updates, employee additions
3. **Payment Gateway** - Real payment processing
4. **Recipe Management** - Food ingredients and preparation
5. **Delivery Tracking** - Real-time order status
6. **Review System** - Customer food ratings
7. **Inventory System** - Stock management
8. **Multi-language** - i18n support
9. **Mobile App** - React Native version
10. **Real-time Updates** - WebSocket integration

---

## Summary Statistics

| Component | Count |
|-----------|-------|
| User Roles | 3 (Customer, Employee, Admin) |
| Database Tables | 5 (Users, Foods, Orders, Employees, Admins) |
| API Endpoints | 35+ |
| Frontend Pages | 8 |
| Frontend Components | 3 |
| Context Providers | 4 |
| Models | 5 |
| Controllers | 5 |
| Route Files | 5 |
| Authentication Methods | 3 (separate) |

This complete system enables a full-featured food ordering platform with role-based management at every level!
