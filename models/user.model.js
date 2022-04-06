const { DataTypes } = require("sequelize");

// Utils
const { sequelize } = require("../utils/database");

// Define a new modal instance
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  },
  role: { type: DataTypes.STRING(10), allowNull: false, defaultValue: "guest" }
});

module.exports = { User };
