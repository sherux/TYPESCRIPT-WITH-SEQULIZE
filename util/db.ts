// const Sequelize = require("sequelize");
// require("dotenv").config();
// console.log(process.env.database);
// const database = process.env.database;
// const user = process.env.user;
// const password = process.env.password;
// const host = process.env.host;
// console.log(password);

// export const sequelize = new Sequelize(database, user, password, {
//   dialect: "mysql",
//   host: host,
//   logging: false,
// });

const Sequelize = require("sequelize");
require("dotenv").config();

export const sequelize = new Sequelize("USER", "root", "Abbas@123", {
  dialect: "mysql",
  host: process.env.host,
  logging: false,
});
