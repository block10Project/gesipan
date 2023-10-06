const boardService = require("../service/board.service");

exports.getWrite = (req, res) => {
  res.render("board/write.html");
};
exports.postWrite = (req, res) => {
  res.redirect("/boards/read");
};

exports.getRead = (req, res) => {
  res.render("board/read.html");
};

exports.getGood = (req, res) => {
  res.redirect("/boards/read");
};

exports.getFollowing = (req, res) => {
  res.render("board/following.html");
};

exports.getFollower = (req, res) => {
  res.render("board/follower.html");
};

exports.getModify = (req, res) => {
  res.render("board/modify.html");
};
exports.postModify = (req, res) => {
  res.redirect("/boards/read");
};

exports.getDelete = (req, res) => {
  res.redirect("/");
};

exports.postComment = (req, res) => {
  res.redirect("/boards/read");
};
