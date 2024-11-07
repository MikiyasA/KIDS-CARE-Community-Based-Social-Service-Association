"use strict";

const Sequelize = require("sequelize");
const config = require("../config/db").default; // Import sequelize instance
const db = {};

const sequelize = config;

// Import models directly
const User = require("./User").default;
const News = require("./News").default;

// Initialize models and add to `db` object
db.User = User;
db.News = News;

// Associate models if an associate function is defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
