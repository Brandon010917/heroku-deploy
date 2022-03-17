const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env"
});

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  dialect: "postgres",
  logging: false
});

module.exports = { sequelize };
