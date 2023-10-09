const express = require("express");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const pool = require("./pool");
const router = require("./src/index");
const middleware = require("./src/middleware/auth.middleware");
const app = express();

app.set("view engine", "html");
nunjucks.configure("views", { express: app });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views/public"));
app.use(middleware.auth);
app.use(router);

app.listen(3000, async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();
  } catch (error) {
    throw new Error("server app.listen() error: ", error.message);
  }
  console.log("listening on 3000");
});
