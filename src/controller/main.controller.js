const mainService = require("../service/main.service");

exports.getList = (req, res) => {
  res.render("index.html");
};

exports.postSearch = (req, res) => {
  res.redirect("search.html");
};
exports.getSearch = (req, res) => {
  res.render("search.html");
};
