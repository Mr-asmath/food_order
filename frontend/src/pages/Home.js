import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { foodService, normalizeListResponse, API_BASE_URL } from '../services/api';
import './Home.css';

function Home() {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError('');
        let response;
        if (category === 'all') {
          response = await foodService.getAllFoods();
        } else {
          response = await foodService.getFoodsByCategory(category);
        }
        setFoods(normalizeListResponse(response));
      } catch (error) {
        console.error('Error fetching foods:', error);
        setFoods([]);
        setError(`Unable to load foods from ${API_BASE_URL}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category]);

  const categories = ['all', 'Pizza', 'Burger', 'Biryani', 'Dessert'];

  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to FoodOrder! 🍔</h1>
        <p>Delicious food delivered to your doorstep</p>

        <div className="category-filter">
          <h3>Categories:</h3>
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading foods...</p>
        ) : error ? (
          <p className="no-foods">{error}</p>
        ) : foods && foods.length > 0 ? (
          <div className="foods-grid">
            {foods.map((food) => (
              <FoodCard key={food?._id || Math.random()} food={food} mode="customer" />
            ))}
          </div>
        ) : (
          <p className="no-foods">No foods available in this category</p>
        )}
      </div>
    </div>
  );
}

export default Home;
