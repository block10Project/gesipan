const mainService = require("../service/main.service");
const boardService = require("../service/board.service");

exports.getWrite = (req, res) => {
  try {
    const result = mainService.selectUserUid();
    if (!result) {
      return res.redirect("/?error=로그인이 필요합니다.");
    }
    res.render("board/write.html", {
      error: req.query.error,
    });
  } catch (error) {
    next(error);
  }
};
exports.postWrite = (req, res) => {
  try {
    const { title, content } = req.body;
    const result = boardService.createBoard(title, content);
    if (!result) {
      return res.redirect("/boards/write?error=내용을 작성해주세요.");
    }
    res.redirect(`/boards/read?id=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getRead = (req, res) => {
  try {
    const boardResult = boardService.selectBoard(req.query.id);
    if (!boardResult) {
      return res.redirect("/?error=존재하지 않는 글입니다.");
    }
    const commentsResult = boardService.selectComments(req.query.id);
    res.render("board/read.html", {
      error: req.query.error,
      board: boardResult,
      comments: commentsResult,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGood = (req, res) => {
  try {
    const result = boardService.createGood(req.query.id);
    if (!result) {
      return res.redirect("/?error=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&error=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = (req, res) => {
  try {
    const result = boardService.createFollowing(req.query.id);
    if (!result) {
      return res.redirect("/?error=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&error=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getUnfollowing = (req, res) => {
  try {
    const result = boardService.deleteFollowing(req.query.id);
    if (!result) {
      return res.redirect("/?error=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&error=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getModify = (req, res) => {
  try {
    const result = boardService.selectBoard(req.query.id);
    if (!result) {
      return res.redirect("/?error=존재하지 않는 글입니다.");
    }
    res.render("board/modify.html", {
      error: req.query.error,
    });
  } catch (error) {
    next(error);
  }
};
exports.postModify = (req, res) => {
  try {
    const { title, content } = req.body;
    const result = boardService.updateBoard(req.query.id, title, content);
    if (!result) {
      return res.redirect(
        `/boards/modify?id=${req.query.id}&error=내용을 작성해주세요.`
      );
    }
    res.redirect(`/boards/read?id=${req.query.id}`);
  } catch (error) {
    next(error);
  }
};

exports.getDelete = (req, res) => {
  try {
    const result = boardService.deleteBoard(req.query.id);
    if (!result) {
      res.redirect(`/boards/read?id=${req.query.id}&error=잘못된 접근입니다.`);
    }
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.postComment = (req, res) => {
  try {
    const result = boardService.createComment(req.query.id);
    if (!result) {
      return res.redirect(
        `boards/read?id=${req.query.id}&error=로그인이 필요합니다.`
      );
    }
    res.redirect(`/boards/read?id=${req.query.id}`);
  } catch (error) {
    next(error);
  }
};
