const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  adminLogin,
  getAdmin,
  getAllEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/adminController');

// Admin Authentication
router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.get('/:id', getAdmin);

// Employee Management (more specific routes first)
router.post('/employees/add', addEmployee);
router.get('/employees/list/all', getAllEmployees);
router.get('/employees/:id', getEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
