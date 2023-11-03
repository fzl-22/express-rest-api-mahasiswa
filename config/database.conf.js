require('dotenv').config();

let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log("[CONNECTED] Connection established...");
});

module.exports = connection;
