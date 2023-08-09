const Sequelize = require("sequelize");
require("dotenv").config();
const database = process.env.database as string;
const username = process.env.username as string;
const password = process.env.password as string;
const host = process.env.host as string;

export const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host: host,
  logging: false,
});


