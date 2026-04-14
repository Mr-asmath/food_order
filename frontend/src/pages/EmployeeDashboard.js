import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeContext from '../context/EmployeeContext';
import { foodService, normalizeListResponse, API_BASE_URL } from '../services/api';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const { employee, logoutEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    image: 'https://via.placeholder.com/300',
    available: true,
    rating: 4.5,
  });

  useEffect(() => {
    if (!employee) {
      navigate('/employee');
    } else {
      fetchFoods();
    }
  }, [employee, navigate]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await foodService.getAllFoods();
      setFoods(normalizeListResponse(response));
    } catch (error) {
      console.error('Error fetching foods:', error);
      setFoods([]);
      setError(`Unable to load foods from ${API_BASE_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      if (editingFood) {
        // Update food
        await foodService.updateFood(editingFood.id, formData);
        setFoods(
          foods.map((food) =>
            food.id === editingFood.id ? { ...food, ...formData } : food
          )
        );
        alert('Food updated successfully!');
      } else {
        // Add new food
        const response = await foodService.addFood(formData);
        setFoods([...foods, response.data]);
        alert('Food added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving food:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error saving food';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFormData(food);
    setShowForm(true);
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await foodService.deleteFood(id);
        setFoods(foods.filter((food) => food.id !== id));
      } catch (error) {
        console.error('Error deleting food:', error);
        alert('Error deleting food');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Pizza',
      image: 'https://via.placeholder.com/300',
      available: true,
      rating: 4.5,
    });
    setEditingFood(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logoutEmployee();
    navigate('/');
  };

  if (!employee) {
    return null;
  }

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🍽️ Food Management Dashboard</h1>
          <div className="employee-info">
            <span>Welcome, {employee.name}</span>
            <span className="role-badge">{employee.role.toUpperCase()}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container dashboard-container">
        <div className="dashboard-controls">
          {!showForm && (
            <button
              className="add-food-btn"
              onClick={() => {
                setShowForm(true);
                setEditingFood(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: 'Pizza',
                  image: 'https://via.placeholder.com/300',
                  available: true,
                  rating: 4.5,
                });
                setError('');
              }}
            >
              + Add New Food
            </button>
          )}
        </div>

        {showForm && (
          <div className="food-form-container">
            <h2>{editingFood ? 'Edit Food' : 'Add New Food'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAddFood} className="food-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Food Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Margherita Pizza"
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="250"
                  />
                </div>
                <div className="form-group">
                  <label>Rating (0-5) *</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Describe the food..."
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://via.placeholder.com/300"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                  Available for order
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Saving...' : editingFood ? 'Update Food' : 'Add Food'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="foods-section">
          <h2>Foods ({foods.length})</h2>

          {loading ? (
            <p className="loading">Loading foods...</p>
          ) : foods.length > 0 ? (
            <div className="foods-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food.id}>
                      <td>
                        <strong>{food.name}</strong>
                        <p className="description">{food.description}</p>
                      </td>
                      <td>{food.category}</td>
                      <td>₹{food.price}</td>
                      <td>⭐ {food.rating}</td>
                      <td>
                        <span className={food.available ? 'available' : 'unavailable'}>
                          {food.available ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditFood(food)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteFood(food.id)}
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
            <p className="no-foods">No foods added yet. Start by adding a new food!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
