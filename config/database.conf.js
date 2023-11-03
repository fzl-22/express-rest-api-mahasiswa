require('dotenv').config();

let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log("[CONNECTED] Connection established...");
});

module.exports = connection;
