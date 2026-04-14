import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, totalPrice } =
    useContext(CartContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Simple checkout - store in session and go to orders
    const orderData = {
      userId: user?._id || user?.id,
      items: cart.map(item => ({ 
        foodId: item._id || item.id, 
        quantity: item.quantity 
      })),
      userDetails: {
        name: user?.name || 'Guest',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || 'Not provided',
        address: user?.address || 'Not provided'
      }
    };

    console.log('Order created with data:', orderData);

    console.log('Checkout initiated with order:', orderData);
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            <table>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <tr key={item?._id || Math.random()}>
                      <td>{item?.name || 'Unknown Item'}</td>
                      <td>₹{item?.price || 0}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item?.quantity || 1}
                          onChange={(e) =>
                            updateCartQuantity(
                              item?._id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>₹{((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item?._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No items in cart</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee:</span>
              <span>₹50</span>
            </div>
            <div className="summary-item tax">
              <span>Total:</span>
              <span>₹{totalPrice + 50}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
