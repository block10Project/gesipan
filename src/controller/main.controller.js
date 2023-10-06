const mainService = require("../service/main.service");

exports.getList = (req, res) => {
  res.render("index.html", {
    user: {
      uid: mainService.selectUserUid(),
    },
    boards: mainService.selectBoards(),
  });
};

exports.postSearch = (req, res) => {
  res.redirect(`search.html?keyword=${req.body.keyword}`);
};
exports.getSearch = (req, res) => {
  res.render("search.html", {
    keyword: req.query.keyword,
    boards: mainService.selectBoards(keyword),
  });
};
