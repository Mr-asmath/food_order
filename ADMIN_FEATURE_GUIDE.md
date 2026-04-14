# Admin Portal Feature Guide

## Overview
The Admin Portal is a complete management system for restaurant administrators to manage employees, view their roles, and control the restaurant's operations. Admins have a separate authentication system and can add, edit, and delete employees with different role assignments.

## Features Implemented

### 1. Admin Authentication System
- **File**: `backend/models/Admin.js`
- Separate admin registration and login
- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access (superadmin/admin)

### 2. Admin Backend Routes & Controllers
- **Files**: 
  - `backend/controllers/adminController.js`
  - `backend/routes/adminRoutes.js`

#### Available Endpoints:
```
POST   /api/admins/register              - Register new admin
POST   /api/admins/login                 - Login admin
GET    /api/admins/:id                   - Get admin profile
GET    /api/admins/employees/list/all    - Get all employees
GET    /api/admins/employees/:id         - Get single employee
POST   /api/admins/employees/add         - Add new employee
PUT    /api/admins/employees/:id         - Update employee
DELETE /api/admins/employees/:id         - Delete employee
```

### 3. Admin Frontend Pages & Components
- **AdminAuth.js** - Login/Register page with form validation
- **AdminDashboard.js** - Main dashboard for employee management
- **AdminContext.js** - State management for admin data
- **CSS Files** - Professional styling with gradients and animations

### 4. Employee Management Interface
The admin dashboard provides complete CRUD operations for managing employees:

#### Features:
- ✅ **View All Employees** - Displays employees in a professional table
- ✅ **Add New Employee** - Form to create new employee accounts
- ✅ **Edit Employee** - Modify employee details and role
- ✅ **Delete Employee** - Remove employees from system
- ✅ **Role Assignment** - Assign manager or admin roles to employees
- ✅ **View Employee Info** - Display name, email, role, and join date

#### Employee Fields:
- Name (required)
- Email (required, unique)
- Password (required for new, optional for updates)
- Role (manager/admin)

## How to Use

### For Admins - Access Admin Portal

1. **Access Admin Portal**
   - Click "🏢 Admin Portal" in the header
   - Or navigate to: `http://localhost:3000/admin`

2. **Admin Login or Register**
   - If you're a new admin: Click "Register" Tab
   - Fill in name, email, and password
   - Click "Register"
   - After registration, login with your credentials
   
3. **Admin Dashboard**
   - After successful login, you'll see the Admin Dashboard
   - Click "👨‍💼 Admin Panel" in header to access employee management

### For Admins - Add a New Employee

1. Click **"+ Add New Employee"** button
2. Fill in the employee form:
   - **Name**: e.g., "John Manager"
   - **Email**: john@restaurant.com (must be unique)
   - **Password**: Set a strong password
   - **Role**: Select from dropdown (Manager/Admin)
3. Click **"Add Employee"** button
4. Employee account will be created immediately

### For Admins - Edit an Employee

1. Locate the employee in the table
2. Click **"Edit"** button
3. Update the fields:
   - Name
   - Email
   - Role
   - Password (leave empty to keep current password)
4. Click **"Update Employee"** button

### For Admins - Delete an Employee

1. Locate the employee in the table
2. Click **"Delete"** button
3. Confirm deletion when prompted
4. Employee account will be removed

### For Admins - Employee Details View

The employee table displays:
- **Name**: Employee's full name
- **Email**: Contact email address
- **Role**: manager or admin
- **Joined**: Date employee account was created
- **Actions**: Edit/Delete buttons for management

## API Integration

### Backend Admin Service (api.js)
```javascript
// Admin authentication
adminService.adminLogin(credentials)
adminService.registerAdmin(adminData)
adminService.getAdmin(id)

// Employee management
adminService.getAllEmployees()
adminService.getEmployee(id)
adminService.addEmployee(employeeData)
adminService.updateEmployee(id, employeeData)
adminService.deleteEmployee(id)
```

## Database Schema

### Admin Model
```javascript
{
  id: INT (Primary Key),
  name: STRING (Required),
  email: STRING (Required, Unique),
  password: STRING (Hashed with bcrypt),
  role: ENUM (superadmin, admin) - Default: admin,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Employee Model (managed by admin)
```javascript
{
  id: INT (Primary Key),
  name: STRING (Required),
  email: STRING (Required, Unique),
  password: STRING (Hashed with bcrypt),
  role: ENUM (manager, admin) - Default: manager,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

## Security Features

✅ **Password Hashing**: bcryptjs with salt rounds
✅ **JWT Tokens**: Unique tokens for admins vs employees/users
✅ **Protected Routes**: Dashboard only accessible with valid admin token
✅ **Role-Based Access**: Different permissions for superadmin/admin
✅ **Email Validation**: Unique email addresses for both admins and employees
✅ **localStorage**: Tokens stored securely for session management
✅ **Separate Auth**: Admins use different endpoints from employees

## Navigation Flow

```
Home Page (Any User)
    ↓
🏢 Admin Portal (AdminAuth page)
    ↓
Admin Login/Register Form
    ↓
✓ Login Success → 👨‍💼 Admin Panel (AdminDashboard page)
    ↓
Employee Management Interface
    - View all employees
    - Add new employee
    - Edit existing employee
    - Delete employee
    - Assign roles
```

## File Structure

```
frontend/src/
├── pages/
│   ├── AdminAuth.js            (Login/Register page)
│   ├── AdminAuth.css
│   ├── AdminDashboard.js       (Main admin dashboard)
│   ├── AdminDashboard.css
│
├── context/
│   └── AdminContext.js         (Admin state management)
│
├── components/
│   └── Header.js (Updated)    (Added admin portal link)
│
└── services/
    └── api.js (Updated)       (Admin endpoints)

backend/
├── models/
│   └── Admin.js               (Admin schema)
│
├── controllers/
│   └── adminController.js     (Admin & employee management logic)
│
└── routes/
    └── adminRoutes.js         (API endpoints)
```

## Testing the Admin Portal

### Using Postman/cURL:

#### 1. Register Admin
```bash
curl -X POST http://localhost:5000/api/admins/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Restaurant Manager",
    "email": "admin@restaurant.com",
    "password": "admin123",
    "role": "admin"
  }'
```

#### 2. Login Admin
```bash
curl -X POST http://localhost:5000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@restaurant.com",
    "password": "admin123"
  }'
```

#### 3. Add Employee (with auth token)
```bash
curl -X POST http://localhost:5000/api/admins/employees/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "John Manager",
    "email": "john@restaurant.com",
    "password": "john123",
    "role": "manager"
  }'
```

#### 4. Get All Employees
```bash
curl -X GET http://localhost:5000/api/admins/employees/list/all \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

#### 5. Update Employee
```bash
curl -X PUT http://localhost:5000/api/admins/employees/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "John Senior Manager",
    "email": "john@restaurant.com",
    "role": "admin"
  }'
```

#### 6. Delete Employee
```bash
curl -X DELETE http://localhost:5000/api/admins/employees/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Troubleshooting

### Admin Portal Not Showing
- Clear browser cache and localStorage
- Ensure AdminContext is properly imported in App.js
- Check Console for errors (F12 → Console)
- Verify all files are created

### Login Failing
- Verify email address is correct
- Ensure admin account exists in database
- Check password is typed correctly
- Look at backend console for database errors
- Verify server is running (http://localhost:5000)

### Add Employee Not Working
- Ensure admin is logged in and token is valid
- Verify all required fields are filled
- Check email is unique (not already used)
- Verify password meets requirements
- Check backend console for validation errors

### Employees Not Showing
- Refresh the page
- Check backend server is running
- Verify database has employee records
- Check network tab in DevTools for API errors
- Clear browser cache if needed

### Admin Logout Issues
- Click logout button in header
- Token will be cleared from localStorage
- You'll be redirected to home page
- Must login again to access admin dashboard

## Role Differences

### Manager
- Employees with "manager" role
- Can manage foods on employee dashboard
- Cannot manage other employees
- Limited access to system

### Admin (Employee)
- Employees with "admin" role
- Can manage foods on employee dashboard
- Can be managed by Admin users
- Same permissions as managers for food management

### Admin (System Admin)
- Full access to admin portal
- Can create/edit/delete employees
- Can assign roles to employees
- Can login to admin dashboard
- Separate from employee roles

## Next Steps

1. **Add Order Management**
   - View all orders across restaurant
   - Update order status
   - Track pending/completed orders

2. **Add Analytics Dashboard**
   - View employee statistics
   - Sales analytics
   - Most ordered items
   - Revenue reports

3. **Add Employee Performance Metrics**
   - Track foods added by each employee
   - Monitor activity logs
   - Performance ratings

4. **Add Inventory Management**
   - Track food stock levels
   - Manage ingredient availability
   - Low stock alerts

5. **Add Audit Logs**
   - Track admin actions
   - Employee activity logs
   - Change history

## Support

For issues or questions:
1. Check backend console for error messages
2. Open browser DevTools → Console tab for frontend errors
3. Check Network tab to see API responses and errors
4. Verify database has correct data
5. Ensure SQLite database file exists at `backend/database.sqlite`

## Integration with Employee Portal
- Admins manage employees
- Employees login and manage foods
- Employees cannot see admin panel
- Separate authentication systems work together
