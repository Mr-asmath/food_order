const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');
const Food = require('./models/Food');
const Order = require('./models/Order');
const Employee = require('./models/Employee');
const Admin = require('./models/Admin');

dotenv.config();

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(express.json());
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((origin) => origin.trim()),
}));

// Initialize database
sequelize.authenticate()
  .then(() => {
    console.log('SQLite database connected');
    // Use force: true only on fresh start, avoid 'alter' which causes issues in SQLite
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database models synced');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Food Order App API (SQL Version)' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
