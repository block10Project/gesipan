const userService = require("../service/user.service");

exports.getLogin = (req, res, next) => {
  try {
    res.render("user/login.html", {
      message: req.query.message,
    });
  } catch (error) {
    next(error);
  }
};
exports.postLogin = async (req, res, next) => {
  try {
    const { id, pw } = req.body;

    const result = await userService.selectUserWhereIdPw(id, pw);
    if (result.message) {
      return res.redirect(`/users/login?message=${result.message}`);
    }
    if (!result.isLogin) {
      return res.redirect(
        "/users/login?message=계정 정보가 일치하지 않습니다."
      );
    }
    res.cookie(
      "token",
      result.data,
      (maxAge = 600),
      (domain = "localhost"),
      (path = "/")
    );
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getRegister = (req, res, next) => {
  try {
    res.render("user/register.html", {
      message: req.query.message,
    });
  } catch (error) {
    next(error);
  }
};
exports.postRegister = async (req, res, next) => {
  try {
    const { nickname, id, pw } = req.body;
    const result = await userService.createUser(nickname, id, pw);
    if (result.result) {
      return res.redirect(`/?message=${result.message}`);
    }
    return res.redirect(`/users/register?message=${result.message}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPassword = (req, res, next) => {
  try {
    res.render("user/password.html", {
      message: req.query.message,
    });
  } catch (error) {
    next(error);
  }
};
exports.postPassword = async (req, res, next) => {
  try {
    const { nickname, id, newPw } = req.body;
    const result = await userService.updateUser(nickname, id, newPw);

    if (result.result) {
      return res.redirect(`/users/login?message=${result.message}`);
    }
    return res.redirect(`/users/password?message=${result.message}`);
  } catch (error) {
    next(error);
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const result = await userService.selectUser(req.query.id);
    if (result.message) {
      return res.redirect(`/?message=${result.message}`);
    }
    res.render("user/info.html", {
      user: result.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const result = await userService.selectFollowings(req.query.id);
    res.render("user/following.html", {
      followings: result.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFollower = async (req, res, next) => {
  try {
    const result = await userService.selectFollowers(req.query.id);
    res.render("user/follower.html", {
      followers: result.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const result = await userService.selectBoards(req.query.id);
    res.render("user/list.html", {
      boards: result.result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLogout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
