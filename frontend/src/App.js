import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartContext from './context/CartContext';
import AuthContext from './context/AuthContext';
import EmployeeContext from './context/EmployeeContext';
import AdminContext from './context/AdminContext';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Auth from './pages/Auth';
import EmployeeAuth from './pages/EmployeeAuth';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [employee, setEmployee] = useState(() => {
    const savedEmployee = localStorage.getItem('employee');
    return savedEmployee ? JSON.parse(savedEmployee) : null;
  });
  const [employeeToken, setEmployeeToken] = useState(localStorage.getItem('employeeToken') || null);
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('admin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);

  const addToCart = (food) => {
    // Normalize food ID: ensure _id is set to id from database
    const normalizedFood = { ...food, _id: food._id || food.id };
    
    const existingFood = cart.find((item) => item._id === normalizedFood._id);
    if (existingFood) {
      setCart(
        cart.map((item) =>
          item._id === normalizedFood._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...normalizedFood, quantity: 1 }]);
    }
  };

  const removeFromCart = (foodId) => {
    setCart(cart.filter((item) => item._id !== foodId));
  };

  const updateCartQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
    } else {
      setCart(
        cart.map((item) =>
          item._id === foodId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginEmployee = (employeeData, empToken) => {
    setEmployee(employeeData);
    setEmployeeToken(empToken);
    localStorage.setItem('employee', JSON.stringify(employeeData));
    localStorage.setItem('employeeToken', empToken);
  };

  const logoutEmployee = () => {
    setEmployee(null);
    setEmployeeToken(null);
    localStorage.removeItem('employee');
    localStorage.removeItem('employeeToken');
  };

  const loginAdmin = (adminData, token) => {
    setAdmin(adminData);
    setAdminToken(token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    localStorage.setItem('adminToken', token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    clearCart();
  };

  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    totalItems: cart.reduce((sum, item) => sum + (item?.quantity || 0), 0),
    totalPrice: cart.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0),
  };

  const authValue = {
    user,
    token,
    loginUser,
    logoutUser,
    isAuthenticated: !!token,
  };

  const employeeValue = {
    employee,
    employeeToken,
    loginEmployee,
    logoutEmployee,
    isEmployeeAuthenticated: !!employeeToken,
  };

  const adminValue = {
    admin,
    adminToken,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated: !!adminToken,
  };

  return (
    <AdminContext.Provider value={adminValue}>
      <EmployeeContext.Provider value={employeeValue}>
        <AuthContext.Provider value={authValue}>
          <CartContext.Provider value={cartValue}>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/employee" element={<EmployeeAuth />} />
                <Route path="/dashboard" element={<EmployeeDashboard />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Routes>
            </Router>
          </CartContext.Provider>
        </AuthContext.Provider>
      </EmployeeContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
