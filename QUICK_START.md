# Quick Start Guide - Admin Portal

## 🚀 Getting Started in 5 Steps

### Step 1: Start the Servers
```bash
# Terminal 1 - Backend
cd backend
npm install  # (if first time)
npm start
# You should see: "Server running on http://localhost:5000"

# Terminal 2 - Frontend
cd frontend
npm install  # (if first time)
npm start
# Browser should open http://localhost:3000
```

### Step 2: Create Your First Admin Account
1. In your browser, click **"🏢 Admin Portal"** in the header (or go to http://localhost:3000/admin)
2. Click **"Register"** tab
3. Fill in:
   - Name: `Admin User`
   - Email: `admin@restaurant.com`
   - Password: `admin123`
4. Click **"Register"** button
5. Wait for success message
6. Click **"Login"** tab
7. Login with your credentials

### Step 3: Add Your First Employee
1. You should now see the **Admin Dashboard**
2. Click **"+ Add New Employee"** button
3. Fill in employee details:
   - **Name**: `John Manager`
   - **Email**: `john@restaurant.com`
   - **Password**: `john123`
   - **Role**: Select `manager`
4. Click **"Add Employee"** button
5. Success! Employee is created

### Step 4: Employee Adds Food
1. Open a new browser tab/window (to keep admin logged in)
2. Go to `http://localhost:3000/employee`
3. Click **"Login"** tab
4. Login with employee credentials:
   - Email: `john@restaurant.com`
   - Password: `john123`
5. You should see **Employee Dashboard**
6. Click **"+ Add New Food"** button
7. Add a food item:
   - Name: `Margherita Pizza`
   - Category: `Pizza`
   - Price: `250`
   - Rating: `4.5`
   - Description: `Delicious fresh pizza`
   - Image: Leave as is
   - Check "Available"
8. Click **"Add Food"** button
9. Food is now visible to customers!

### Step 5: Customer Browses Foods
1. In original tab/window, go back to `http://localhost:3000` (or click home)
2. If logged in as admin, click **"Logout"**
3. Refresh the page to go back to home
4. You should see the food item you just added!
5. Click on it to see details
6. Click **"Add to Cart"** to add it to your cart

## 📱 Role Quick Access

### As Admin:
- **Login**: http://localhost:3000/admin
- **Dashboard**: http://localhost:3000/admin-dashboard
- **Features**: Manage employees

### As Employee:
- **Login**: http://localhost:3000/employee
- **Dashboard**: http://localhost:3000/dashboard
- **Features**: Manage foods

### As Customer:
- **Login**: http://localhost:3000/auth
- **Featured**: Browse foods, cart, orders

## 🔑 Demo Credentials (After Setup)

```
ADMIN:
- Email: admin@restaurant.com
- Password: admin123

EMPLOYEE:
- Email: john@restaurant.com
- Password: john123
```

## 📊 What You Can Do Now

### Admin Can:
✅ Register/Login
✅ View all employees
✅ Add new employees
✅ Edit employee details
✅ Delete employees
✅ Assign roles to employees
✅ Logout

### Employee Can:
✅ Login with assigned account
✅ View all foods
✅ Add new foods
✅ Edit existing foods
✅ Delete foods
✅ Mark foods as unavailable
✅ Logout

### Customer Can:
✅ Register/Login
✅ Browse all foods
✅ Filter by category
✅ Add to cart
✅ View cart
✅ Place orders
✅ View order history
✅ Logout

## 🔍 Verify Everything Works

### Check Backend Endpoints
Open Postman or use curl to test:

```bash
# Get all foods
curl http://localhost:5000/api/foods

# Should return array of foods including the one you added
```

### Check Frontend Features
1. ✅ Can login/register as all three roles
2. ✅ Admin can add employees
3. ✅ Employee can add foods
4. ✅ Customer can see foods
5. ✅ Logout works for all roles
6. ✅ Navigation updates based on logged-in role

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# If port 5000 is in use:
export PORT=5001  # Linux/Mac
set PORT=5001     # Windows

# If port 3000 is in use, React will prompt for different port
```

### Database Issues
```bash
# If database corrupted, delete and restart:
delete backend/database.sqlite
npm start  # in backend folder
```

### Token Issues
```bash
# If login not working:
1. Open DevTools (F12)
2. Go to Application → LocalStorage
3. Clear all localStorage
4. Try login again
```

### API Not Responding
```bash
# Check backend console for errors
# Make sure both servers are running
# Check http://localhost:5000 in browser
# Should show: {"message":"Food Order App API"}
```

## 📚 Next Steps

1. **Add More Employees**
   - Login as admin
   - Add more employees with different roles

2. **Add More Foods**
   - Login as different employees
   - Add variety of foods

3. **Test Customer Flow**
   - Browse foods
   - Add to cart
   - Place order
   - View order history

4. **Try Editing**
   - As admin: Edit employee details
   - As employee: Edit food prices/availability

5. **Try Deleting**
   - As admin: Delete an employee
   - As employee: Delete a food item
   - Watch the UI update in real-time

## 💡 Pro Tips

### For Testing Multiple Roles Simultaneously:
1. Open 3 browser windows:
   - Window 1: Admin logged in
   - Window 2: Employee logged in
   - Window 3: Customer (or logout all)

2. Make changes in one window
3. Refresh other windows to see updates

### View API Responses:
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action
4. Click on API request
5. See request/response data

### Check Database directly:
You can view SQLite database with:
- DB Browser for SQLite (free tool)
- File location: `backend/database.sqlite`

## 🎯 Tasks to Try

### Task 1: Full Restaurant Setup (10 mins)
- [ ] Create admin account
- [ ] Create 2 employees
- [ ] Employee 1 adds 5 foods
- [ ] Employee 2 adds 5 foods
- [ ] View all 10 foods as customer

### Task 2: Role Testing (5 mins)
- [ ] Login as each role
- [ ] Verify different dashboards
- [ ] Logout and check header changes

### Task 3: Food Management Workflow (10 mins)
- [ ] Login as employee
- [ ] Add food with all details
- [ ] Edit price
- [ ] Mark unavailable
- [ ] View as customer
- [ ] Delete food

### Task 4: Employee Management Workflow (10 mins)
- [ ] Login as admin
- [ ] Add 3 employees with different roles
- [ ] Edit one employee's details
- [ ] Change employee role
- [ ] Delete one employee

## 📞 Need Help?

### Check These Files:
1. **For Admin Features**: `ADMIN_FEATURE_GUIDE.md`
2. **For Employee Features**: `EMPLOYEE_FEATURE_GUIDE.md`
3. **For System Overview**: `SYSTEM_ARCHITECTURE.md`
4. **For API Docs**: Check endpoint lists in guides above

### Common Errors:

**"Email already registered"**
- That email already exists in the system
- Use a different email address

**"Invalid email or password"**
- Check spelling of email/password
- Make sure account exists
- Try registering new account

**"Cannot find module"**
- Run `npm install` in that folder
- Delete node_modules and reinstall

**Page shows "Not Found"**
- Make sure servers are running
- Try refreshing page
- Check console for errors

## ✨ You're All Set!

Congratulations! You now have a fully functional food ordering system with:
- ✅ Admin Portal for managing employees
- ✅ Employee Portal for managing foods
- ✅ Customer Portal for ordering
- ✅ Complete authentication system
- ✅ Professional UI with responsive design

**Start exploring and building!** 🚀

---

For detailed information about each feature, see:
- Admin-specific details: Read `ADMIN_FEATURE_GUIDE.md`
- Employee-specific details: Read `EMPLOYEE_FEATURE_GUIDE.md`
- Full system overview: Read `SYSTEM_ARCHITECTURE.md`
