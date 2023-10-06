const mainService = require("../service/main.service");

exports.getList = (req, res) => {
  try {
    res.render("index.html", {
      user: {
        uid: mainService.selectUserUid(),
      },
      boards: mainService.selectBoards(),
    });
  } catch (error) {
    next(error);
  }
};

exports.postSearch = (req, res) => {
  try {
    res.redirect(`search.html?keyword=${req.body.keyword}`);
  } catch (error) {
    next(error);
  }
};
exports.getSearch = (req, res) => {
  try {
    res.render("search.html", {
      keyword: req.query.keyword,
      boards: mainService.selectBoards(keyword),
    });
  } catch (error) {
    next(error);
  }
};
