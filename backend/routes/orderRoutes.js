const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// Get all orders (admin)
router.get('/', orderController.getAllOrders);

// Get user orders
router.get('/user/:userId', orderController.getUserOrders);

// Get single order
router.get('/:id', orderController.getOrder);

// Update order status
router.put('/:id', orderController.updateOrderStatus);

// Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
