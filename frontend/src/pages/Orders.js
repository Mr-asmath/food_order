import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../context/AuthContext';
import { orderService } from '../services/api';
import './Orders.css';

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!user) {
      console.log('No user logged in');
      return;
    }
    try {
      setLoading(true);
      const userId = user._id || user.id;
      console.log('Fetching orders for user:', userId);
      const response = await orderService.getUserOrders(userId);
      console.log('Orders response:', response.data);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.error('Status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const submitPendingOrder = useCallback(async (orderData) => {
    try {
      // Ensure userId is set correctly
      const finalOrderData = {
        ...orderData,
        userId: orderData.userId || user?._id || user?.id
      };
      console.log('Submitting order:', finalOrderData);
      const response = await orderService.createOrder(finalOrderData);
      console.log('Order created:', response.data);
      setOrders((prevOrders) => [response.data, ...prevOrders]);
    } catch (error) {
      console.error('Error creating order:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Check whether the backend API is reachable and the API base URL is configured correctly.');
    }
  }, [user]);

  useEffect(() => {
    const initializeOrders = async () => {
      if (user) {
        await fetchOrders();
      }

      // Check for pending order from cart checkout
      const pending = sessionStorage.getItem('pendingOrder');
      if (pending) {
        await submitPendingOrder(JSON.parse(pending));
        sessionStorage.removeItem('pendingOrder');
      }
    };

    initializeOrders();
  }, [user, fetchOrders, submitPendingOrder]);

  if (!user) {
    return (
      <div className="orders">
        <div className="container">
          <h1>My Orders</h1>
          <div className="auth-required">
            <p>Please log in to view your orders</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <div className="container">
        <h1>My Orders</h1>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order?._id || Math.random()} className="order-card">
                <div className="order-header">
                  <h3>Order #{order?._id ? order._id.toString().slice(-6) : 'N/A'}</h3>
                  <span className={`status ${order?.status || 'pending'}`}>{order?.status || 'pending'}</span>
                </div>

                <div className="order-details">
                  <p>
                    <strong>Date:</strong>{' '}
                    {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{(order?.totalPrice || 0) + 50}
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {order?.paymentStatus || 'pending'}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong>{' '}
                    {order?.userDetails?.address || 'Not provided'}
                  </p>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order?.items && Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <li key={idx}>
                          {item?.name || 'Unknown item'} x {item?.quantity || 0} - ₹{item?.subtotal || 0}
                        </li>
                      ))
                    ) : (
                      <li>No items in this order</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">No orders yet. Start ordering now!</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
