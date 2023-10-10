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
    const result = await boardService.createBoard(
      title,
      content,
      userUid.result.uid
    );
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
    const userUid = await mainService.selectUserUid(req);
    const boardResult = await boardService.selectBoard(req.query.id);
    if (boardResult.message) {
      return res.redirect(`/?message=${boardResult.message}`);
    }
    const commentsResult = await boardService.selectComments(req.query.id);

    if (userUid.result) {
      const userIsGood = await boardService.selectGoodUser(
        boardResult.result.uid,
        userUid.result.uid
      );
      const userIsFollowing = await boardService.selectFollowingUser(
        boardResult.result.board_user_uid,
        userUid.result.uid
      );
      res.render("board/read.html", {
        user: {
          uid: userUid.result.uid,
          is_good: userIsGood.result,
          is_following: userIsFollowing.result,
        },
        message: req.query.message,
        board: boardResult.result,
        comments: commentsResult.result,
      });
    } else {
      res.render("board/read.html", {
        user: {
          uid: null,
          is_good: null,
          is_following: null,
        },
        message: req.query.message,
        board: boardResult.result,
        comments: commentsResult.result,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getGood = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.createGood(
        req.query.id,
        userUid.result.uid
      );
      return res.redirect(
        `/boards/read?id=${req.query.id}&message=${result.message}`
      );
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getNotGood = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.deleteGood(
        req.query.id,
        userUid.result.uid
      );
      return res.redirect(
        `/boards/read?id=${req.query.id}&message=${result.message}`
      );
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.createFollow(
        req.query.user_uid,
        userUid.result.uid
      );
      if (result.result) {
        return res.redirect(
          `/boards/read?id=${req.query.board_uid}&message=${result.message}`
        );
      }
      return res.redirect(`/?message=${result.message}`);
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getUnfollowing = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.deleteFollow(
        req.query.user_uid,
        userUid.result.uid
      );
      if (result.result) {
        return res.redirect(
          `/boards/read?id=${req.query.board_uid}&message=${result.message}`
        );
      }
      return res.redirect(`/?message=${result.message}`);
    }
    return res.redirect(`/?message=${userUid.message}`);
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
      board: result.result,
    });
  } catch (error) {
    next(error);
  }
};
exports.postModify = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.updateBoard(
        req.query.id,
        title,
        content,
        userUid.result.uid
      );

      return res.redirect(
        `/boards/read?id=${req.query.id}&message=${result.message}`
      );
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getDelete = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.deleteBoard(
        req.query.id,
        userUid.result.uid
      );
      return res.redirect(`/?message=${result.message}`);
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const userUid = await mainService.selectUserUid(req);
    if (userUid.result) {
      const result = await boardService.createComment(
        req.query.id,
        userUid.result.uid,
        req.body.comment
      );
      return res.redirect(
        `/boards/read?id=${req.query.id}&message=${result.message}`
      );
    }
    return res.redirect(`/?message=${userUid.message}`);
  } catch (error) {
    next(error);
  }
};
