const mainService = require("../service/main.service");
const boardService = require("../service/board.service");

exports.getWrite = async (req, res) => {
  try {
    const result = await mainService.selectUserUid();
    if (!result) {
      return res.redirect("/?message=로그인이 필요합니다.");
    }
    res.render("board/write.html", {
      message: req.query.message,
    });
  } catch (error) {
    next(error);
  }
};
exports.postWrite = async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await boardService.createBoard(title, content);
    if (!result) {
      return res.redirect("/boards/write?message=내용을 작성해주세요.");
    }
    res.redirect(`/boards/read?id=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getRead = async (req, res) => {
  try {
    const boardResult = await boardService.selectBoard(req.query.id);
    if (!boardResult) {
      return res.redirect("/?message=존재하지 않는 글입니다.");
    }
    const commentsResult = await boardService.selectComments(req.query.id);
    res.render("board/read.html", {
      message: req.query.message,
      board: boardResult,
      comments: commentsResult,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGood = async (req, res) => {
  try {
    const result = await boardService.createGood(req.query.id);
    if (!result) {
      return res.redirect("/?message=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const result = await boardService.createFollowing(req.query.id);
    if (!result) {
      return res.redirect("/?message=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getUnfollowing = async (req, res) => {
  try {
    const result = await boardService.deleteFollowing(req.query.id);
    if (!result) {
      return res.redirect("/?message=존재하지 않는 글입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getModify = async (req, res) => {
  try {
    const result = await boardService.selectBoard(req.query.id);
    if (!result) {
      return res.redirect("/?message=존재하지 않는 글입니다.");
    }
    res.render("board/modify.html", {
      message: req.query.message,
      board: {
        uid: req.query.id,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.postModify = async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await boardService.updateBoard(req.query.id, title, content);
    if (!result) {
      return res.redirect(
        `/boards/modify?id=${req.query.id}&message=내용을 작성해주세요.`
      );
    }
    res.redirect(`/boards/read?id=${req.query.id}`);
  } catch (error) {
    next(error);
  }
};

exports.getDelete = async (req, res) => {
  try {
    const result = await boardService.deleteBoard(req.query.id);
    if (!result) {
      res.redirect(
        `/boards/read?id=${req.query.id}&message=잘못된 접근입니다.`
      );
    }
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.postComment = async (req, res) => {
  try {
    const result = await boardService.createComment(req.query.id);
    if (!result) {
      return res.redirect(
        `boards/read?id=${req.query.id}&message=로그인이 필요합니다.`
      );
    }
    res.redirect(`/boards/read?id=${req.query.id}`);
  } catch (error) {
    next(error);
  }
};
