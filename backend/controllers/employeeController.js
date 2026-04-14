const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

// Register Employee (Admin only)
exports.registerEmployee = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  try {
    // Check if employee exists
    let employee = await Employee.findOne({ where: { email } });
    if (employee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    employee = await Employee.create({
      name,
      email,
      password,
      role: role || 'manager',
      phone,
    });

    const token = jwt.sign(
      { employeeId: employee.id, role: employee.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Employee Login
exports.employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { employeeId: employee.id, role: employee.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Employee Details
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Employees (Admin only)
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { name, phone, role } = req.body;
    if (name) employee.name = name;
    if (phone) employee.phone = phone;
    if (role) employee.role = role;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Employee (Admin only)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
