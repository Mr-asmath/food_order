const { Sequelize } = require('sequelize');
const path = require('path');

const storagePath = process.env.SQLITE_STORAGE_PATH || path.join(__dirname, '../database.sqlite');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
