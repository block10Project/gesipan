const express = require("express");
const router = express.Router();
const userController = require("./controller/user.controller");
const boardController = require("./controller/board.controller");

router.get("/", (req, res) => {
  res.render("index.html");
});
router.get("/search", (req, res) => {
  res.render("search.html");
});

router.use("/users", userController);
router.use("/boards", boardController);
