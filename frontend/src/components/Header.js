import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import EmployeeContext from '../context/EmployeeContext';
import AdminContext from '../context/AdminContext';
import './Header.css';

function Header() {
  const { totalItems } = useContext(CartContext);
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const { isEmployeeAuthenticated, logoutEmployee } = useContext(EmployeeContext);
  const { isAdminAuthenticated, logoutAdmin } = useContext(AdminContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🍕 FoodOrder
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          {!isEmployeeAuthenticated && !isAdminAuthenticated && (
            <>
              <Link to="/cart">
                🛒 Cart <span className="cart-count">({totalItems})</span>
              </Link>
              {isAuthenticated && <Link to="/orders">My Orders</Link>}
              {isAuthenticated ? (
                <button onClick={logoutUser}>Logout</button>
              ) : (
                <Link to="/auth">Login</Link>
              )}
            </>
          )}
          {isEmployeeAuthenticated ? (
            <>
              <Link to="/dashboard" className="employee-link">
                📊 Dashboard
              </Link>
              <button onClick={logoutEmployee} className="logout-btn">
                Logout
              </button>
            </>
          ) : !isAdminAuthenticated ? (
            <Link to="/employee" className="employee-link">
              🔑 Employee Portal
            </Link>
          ) : null}
          {isAdminAuthenticated ? (
            <>
              <Link to="/admin-dashboard" className="admin-link">
                👨‍💼 Admin Panel
              </Link>
              <button onClick={logoutAdmin} className="logout-btn">
                Logout
              </button>
            </>
          ) : !isEmployeeAuthenticated && !isAdminAuthenticated ? (
            <Link to="/admin" className="admin-link">
              🏢 Admin Portal
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
