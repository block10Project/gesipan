const mainService = require("../service/main.service");

exports.getList = async (req, res, next) => {
  try {
    const uidResult = await mainService.selectUserUid(req);
    const boardsResult = await mainService.selectBoards(req);

    res.render("index.html", {
      message: req.query.message,
      user: {
        uid: uidResult.result.uid,
      },
      boards: boardsResult.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.postSearch = (req, res, next) => {
  try {
    res.redirect(`/search?keyword=${req.body.keyword}`);
  } catch (error) {
    next(error);
  }
};
exports.getSearch = async (req, res, next) => {
  try {
    const result = await mainService.selectBoards(req);
    if (result.message) {
      return res.redirect(`/?message=${result.message}`);
    }
    res.render("search.html", {
      keyword: req.query.keyword,
      boards: result.result,
    });
  } catch (error) {
    next(error);
  }
};
