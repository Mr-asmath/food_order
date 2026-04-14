const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all foods
router.get('/', foodController.getAllFoods);

// Get foods by category
router.get('/category/:category', foodController.getFoodsByCategory);

// Get single food
router.get('/:id', foodController.getFood);

// Add new food (admin)
router.post('/', foodController.addFood);

// Update food (admin)
router.put('/:id', foodController.updateFood);

// Delete food (admin)
router.delete('/:id', foodController.deleteFood);

module.exports = router;
