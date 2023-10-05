const mysql2 = require("mysql2/promise");
const pool = mysql2.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "p@ssw0rd",
  database: "login",
});

module.exports = pool;
