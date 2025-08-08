const { Sequelize } = require('sequelize');
require('dotenv').config();
const personModel = require('../models/Person');
const userModel = require('../models/User');

// SQLite configuration - database file will be created in your project
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || './people.db', // Database file path
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Optional: disable logging in production
});

const db = {};
db.Sequelize = sequelize;
db.Person = personModel(sequelize);
db.Users = userModel(sequelize);

module.exports = db;