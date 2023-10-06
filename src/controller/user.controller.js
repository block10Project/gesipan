const userService = require("../service/user.service");

exports.getLogin = (req, res) => {
  res.render("user/login.html");
};
exports.postLogin = (req, res) => {
  res.redirect("/");
};

exports.getRegister = (req, res) => {
  res.render("user/register.html");
};
exports.postRegister = (req, res) => {
  res.redirect("/users/login");
};

exports.getPassword = (req, res) => {
  res.render("user/password.html");
};
exports.postPassword = (req, res) => {
  res.redirect("/users/login");
};

exports.getInfo = (req, res) => {
  res.render("user/info.html");
};

exports.getFollowing = (req, res) => {
  res.render("user/following.html");
};

exports.getFollower = (req, res) => {
  res.render("user/follwer.html");
};

exports.getList = (req, res) => {
  res.render("user/list.html");
};

exports.getLogout = (req, res) => {
  res.redirect("/");
};
