# Troubleshooting Guide - Food Order App

## Issue: Order Creation Fails with 404 Error

**Error:** `Error creating order: AxiosError: Request failed with status code 404`

### Root Causes

The 404 error occurs when:
1. **Backend server is not running** (Most common)
2. The backend server crashed or stopped
3. Wrong backend URL in frontend configuration

---

## Fix: Start the Backend Server

### Step 1: Open a Terminal/Command Prompt
- Press `Ctrl + Shift + ~` in VS Code to open integrated terminal
- Or manually open cmd/PowerShell

### Step 2: Navigate to Backend Folder
```bash
cd d:\program\node js\food_order\backend
```

### Step 3: Install Dependencies (if not done)
```bash
npm install
```

### Step 4: Start the Server
```bash
npm start
```

### Expected Output
```
SQLite database connected
Database models synced
Server running on http://localhost:5000
```

---

## Verification Checklist

✅ **Backend Running:**
- Open browser and go to `http://localhost:5000`
- You should see: `{"message":"Food Order App API (SQL Version)"}`

✅ **Frontend Running:**
- In another terminal, go to `d:\program\node js\food_order\frontend`
- Run `npm start`
- Frontend should run on `http://localhost:3000`

✅ **Both Servers Required:**
- Backend MUST be running on port 5000
- Frontend runs on port 3000
- They communicate via API calls

---

## Troubleshooting Steps

### 1. Check if Server is Running
```bash
# Terminal shows "Server running on http://localhost:5000"
# If not, start it with: npm start
```

### 2. Check Terminal for Errors
- Look for console errors in the backend terminal
- Common errors:
  - `Database error` → Database file has issues
  - `Port already in use` → Port 5000 is taken, change in server.js

### 3. Frontend Console (Browser DevTools)
- Press `F12` to open DevTools
- Go to **Console** tab
- Check for detailed error messages when creating an order

### 4. Network Tab in DevTools
- Click **Network** tab
- Try creating an order
- Look for the failed request to `/api/orders`
- Check the response for error details

---

## Port Already in Use?

If `port 5000 already in use`:

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F

# Then start the server again
npm start
```

---

## Database Issues?

Delete the SQLite database and let it recreate:

```bash
cd d:\program\node js\food_order\backend
# Delete database.sqlite file
del database.sqlite

# Restart the server
npm start
```

---

## Complete Workflow to Test Order Creation

1. **Terminal 1 - Start Backend:**
   ```bash
   cd d:\program\node js\food_order\backend
   npm start
   ```
   (Wait for "Server running on http://localhost:5000")

2. **Terminal 2 - Start Frontend:**
   ```bash
   cd d:\program\node js\food_order\frontend
   npm start
   ```
   (Frontend opens at http://localhost:3000)

3. **In Browser:**
   - Go to Home page
   - Add food items to cart
   - Click "Checkout" → Goes to Cart page
   - Click "Place Order" → Navigates to Orders page
   - If backend is running, order should be created successfully!

---

## Still Getting 404?

1. Check DevTools Console (F12) for more detailed error
2. Look at backend terminal for error messages
3. Verify OrderRoutes are registered in server.js
4. Make sure the database is connected

If all else fails, try restarting both servers from scratch.
