const { DataTypes } = require("sequelize");
// Utils
const { sequelize } = require("../utils/database");

const Post = sequelize.define("post", {
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.STRING(255),
    defaultValue: "active",
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = { Post };
