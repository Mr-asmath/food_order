import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../context/AdminContext';
import { adminService } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const { admin, logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    } else {
      fetchEmployees();
    }
  }, [admin, navigate]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || (!editingEmployee && !formData.password)) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      if (editingEmployee) {
        // Update employee
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await adminService.updateEmployee(editingEmployee.id, updateData);
        setEmployees(
          employees.map((emp) =>
            emp.id === editingEmployee.id ? { ...emp, ...updateData } : emp
          )
        );
        alert('Employee updated successfully!');
      } else {
        // Add new employee
        const response = await adminService.addEmployee(formData);
        setEmployees([...employees, response.data.employee]);
        alert('Employee added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error saving employee';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      password: '',
      role: employee.role,
    });
    setShowForm(true);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await adminService.deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
        setError('');
      } catch (error) {
        console.error('Error deleting employee:', error);
        setError('Error deleting employee');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'manager',
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🏢 Admin Dashboard</h1>
          <div className="admin-info">
            <span>Welcome, {admin.name}</span>
            <span className="role-badge">{admin.role.toUpperCase()}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container dashboard-container">
        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-controls">
          {!showForm && (
            <button
              className="add-employee-btn"
              onClick={() => {
                setShowForm(true);
                setEditingEmployee(null);
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  role: 'manager',
                });
                setError('');
              }}
            >
              + Add New Employee
            </button>
          )}
        </div>

        {showForm && (
          <div className="employee-form-container">
            <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
            <form onSubmit={handleAddEmployee} className="employee-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., John Manager"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@restaurant.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password {editingEmployee && '(leave empty to keep current)'}</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingEmployee}
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Saving...' : editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={submitting}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="employees-section">
          <h2>Employees ({employees.length})</h2>

          {loading ? (
            <p className="loading">Loading employees...</p>
          ) : employees.length > 0 ? (
            <div className="employees-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <strong>{employee.name}</strong>
                      </td>
                      <td>{employee.email}</td>
                      <td>
                        <span className={`role-badge ${employee.role}`}>
                          {employee.role.toUpperCase()}
                        </span>
                      </td>
                      <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-employees">No employees added yet. Start by adding a new employee!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
