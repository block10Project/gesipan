const express = require("express");
const router = express.Router();
const userRouter = require("./route/user.route");
const boardRouter = require("./route/board.route");
const mainRouter = require("./route/main.route");

router.get("/", (req, res) => {
  res.render("index.html");
});
router.post("/search", (req, res) => {
  res.redirect("/search");
});
router.get("/search", (req, res) => {
  res.render("search.html");
});
router.use("", mainRouter);
router.use("/users", userRouter);
router.use("/boards", boardRouter);
