const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee Registration (Admin only)
router.post('/register', employeeController.registerEmployee);

// Employee Login
router.post('/login', employeeController.employeeLogin);

// Get Employee Details
router.get('/:id', employeeController.getEmployee);

// Get All Employees (Admin only)
router.get('/', employeeController.getAllEmployees);

// Update Employee
router.put('/:id', employeeController.updateEmployee);

// Delete Employee (Admin only)
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
