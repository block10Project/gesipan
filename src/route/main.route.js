const express = require("express");
const mainController = require("../controller/main.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.html", mainController.getList);
});

router.post("/search", (req, res) => {
  res.redirect("/search", mainController.postSearch);
});
router.get("/search", (req, res) => {
  res.render("search.html", mainController.getSearch);
});

module.exports = router;
