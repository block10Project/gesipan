const mainService = require("../service/main.service");

exports.getList = (req, res) => {
  try {
    const uidResult = mainService.selectUserUid();
    const boardsResult = mainService.selectBoards();
    res.render("index.html", {
      error: req.query.error,
      user: {
        uid: uidResult,
      },
      boards: boardsResult,
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
    const result = mainService.selectBoards(keyword);
    if (!result) {
      return res.redirect("/?error=검색 결과가 존재하지 않습니다.");
    }
    res.render("search.html", {
      keyword: req.query.keyword,
      boards: result,
    });
  } catch (error) {
    next(error);
  }
};
