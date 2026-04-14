import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const normalizeListResponse = (response) => {
  const payload = response?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  console.error('Expected an array response but received:', payload);
  return [];
};

// Foods
export const foodService = {
  getAllFoods: () => api.get('/foods'),
  getFoodsByCategory: (category) => api.get(`/foods/category/${category}`),
  getFood: (id) => api.get(`/foods/${id}`),
  addFood: (food) => api.post('/foods', food),
  updateFood: (id, food) => api.put(`/foods/${id}`, food),
  deleteFood: (id) => api.delete(`/foods/${id}`),
};

// Orders
export const orderService = {
  createOrder: (order) => api.post('/orders', order),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getAllOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}`, status),
  deleteOrder: (id) => api.delete(`/orders/${id}`),
};

// Users
export const userService = {
  registerUser: (userData) => api.post('/users/register', userData),
  loginUser: (credentials) => api.post('/users/login', credentials),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Employees
export const employeeService = {
  registerEmployee: (employeeData) => api.post('/employees/register', employeeData),
  employeeLogin: (credentials) => api.post('/employees/login', credentials),
  getEmployee: (id) => api.get(`/employees/${id}`),
  getAllEmployees: () => api.get('/employees'),
  updateEmployee: (id, employeeData) => api.put(`/employees/${id}`, employeeData),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
};

// Admins
export const adminService = {
  registerAdmin: (adminData) => api.post('/admins/register', adminData),
  adminLogin: (credentials) => api.post('/admins/login', credentials),
  getAdmin: (id) => api.get(`/admins/${id}`),
  getAllEmployees: () => api.get('/admins/employees/list/all'),
  getEmployee: (id) => api.get(`/admins/employees/${id}`),
  addEmployee: (employeeData) => api.post('/admins/employees/add', employeeData),
  updateEmployee: (id, employeeData) => api.put(`/admins/employees/${id}`, employeeData),
  deleteEmployee: (id) => api.delete(`/admins/employees/${id}`),
};

export { normalizeListResponse, API_BASE_URL };

export default api;
