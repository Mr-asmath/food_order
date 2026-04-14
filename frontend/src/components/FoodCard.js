import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import './FoodCard.css';

function FoodCard({ food, mode = 'customer' }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(food);
      }
      setAdded(true);
      setQuantity(1);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className={`food-card ${!food?.available ? 'unavailable' : ''}`}>
      <div className="food-image">
        <img src={food?.image || '/default-food.png'} alt={food?.name || 'Food'} />
        {!food?.available && <span className="out-of-stock">Out of Stock</span>}
      </div>
      <div className="food-info">
        <h3>{food?.name || 'Unknown Food'}</h3>
        <p className="description">{food?.description || 'No description available'}</p>
        <div className="food-footer">
          <div className="price-rating">
            <span className="price">₹{food?.price || 0}</span>
            <span className="rating">⭐ {food?.rating || 0}</span>
          </div>
          {mode === 'customer' && (
            <div className="add-to-cart">
              {food?.available ? (
                <>
                  <div className="qty-selector">
                    <button 
                      aria-label="decrease quantity"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button 
                      aria-label="increase quantity"
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className={`add-btn ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                  >
                    {added ? '✓ Added' : 'Add to Cart'}
                  </button>
                </>
              ) : (
                <button className="add-btn" disabled>
                  Out of Stock
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
