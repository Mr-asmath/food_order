import React, { createContext } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = React.useState(null);
  const [adminToken, setAdminToken] = React.useState(localStorage.getItem('adminToken') || null);

  const loginAdmin = (adminData, token) => {
    setAdmin(adminData);
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  const value = {
    admin,
    adminToken,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated: !!adminToken,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export default AdminContext;
