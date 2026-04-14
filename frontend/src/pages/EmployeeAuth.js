import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeContext from '../context/EmployeeContext';
import { employeeService } from '../services/api';
import './EmployeeAuth.css';

function EmployeeAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { loginEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await employeeService.employeeLogin({
        email: formData.email,
        password: formData.password,
      });
      loginEmployee(response.data.employee, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-auth">
      <div className="auth-container">
        <div className="auth-form">
          <h2>🏢 Employee Login</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="employee@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Logging in...' : 'Employee Login'}
            </button>
          </form>

          <p className="help-text">
            Don't have an account? Contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAuth;
