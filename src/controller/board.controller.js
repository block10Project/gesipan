const mainService = require("../service/main.service");
const boardService = require("../service/board.service");

exports.getWrite = async (req, res, next) => {
  try {
    const result = await mainService.selectUserUid(req);
    if (result.message) {
      return res.redirect(`/?message=${result.message}`);
    }
    res.render("board/write.html", {
      message: req.query.message,
    });
  } catch (error) {
    next(error);
  }
};
exports.postWrite = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.createBoard(title, content, userUid);
    if (result.message) {
      return res.redirect(`/boards/write?message=${result.message}`);
    }
    res.redirect(`/boards/read?id=${result.result}`);
  } catch (error) {
    next(error);
  }
};

exports.getRead = async (req, res, next) => {
  try {
    const boardResult = await boardService.selectBoard(req.query.id);
    if (boardResult.message) {
      return res.redirect(`/?message=${boardResult.message}`);
    }
    const commentsResult = await boardService.selectComments(req.query.id);
    res.render("board/read.html", {
      message: req.query.message,
      board: boardResult.result,
      comments: commentsResult.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGood = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.createGood(req.query.id, userUid);
    res.redirect(`/boards/read?id=${req.query.id}&message=${result.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    if (req.query.id) {
      const userUid = await mainService.selectUserUid(req);
      const result = await boardService.createFollow(req.query.id, userUid);
      if (!result) {
        return res.redirect(`/?message=${result.message}`);
      }
      res.redirect(`/boards/read?id=${req.query.id}&message=${result.result}`);
    }
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getUnfollowing = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.deleteFollow(req.query.id, userUid);
    if (!result) {
      return res.redirect("/?message=존재하지 않는 사용자입니다.");
    }
    res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getModify = async (req, res, next) => {
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
exports.postModify = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.updateBoard(
      req.query.id,
      title,
      content,
      userUid
    );

    res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.getDelete = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.deleteBoard(req.query.id, userUid);
    res.redirect(`/?message=${result}`);
  } catch (error) {
    next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    const result = await boardService.createComment(
      req.query.id,
      userUid,
      req.body.comment
    );
    if (result) {
      return res.redirect(`/boards/read?id=${req.query.id}&message=${result}`);
    }
    res.redirect(`/boards/read?id=${req.query.id}`);
  } catch (error) {
    next(error);
  }
};
