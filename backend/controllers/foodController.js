const Food = require('../models/Food');

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get food by category
exports.getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.findAll({ where: { category } });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single food
exports.getFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new food (admin)
exports.addFood = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update food (admin)
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    await food.update(req.body);
    res.json(food);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete food (admin)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    await food.destroy();
    res.json({ message: 'Food deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
