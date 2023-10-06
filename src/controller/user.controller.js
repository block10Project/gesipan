const userService = require("../service/user.service");

exports.getLogin = (req, res) => {
  try {
    res.render("user/login.html", {
      error: req.query.error,
    });
  } catch (error) {
    next(error);
  }
};
exports.postLogin = async (req, res) => {
  try {
    const { id, pw } = req.body;
    const result = await userService.selectUser(id, pw);
    if (!result.isLogin) {
      return res.redirect("/login?error=계정 정보가 일치하지 않습니다.");
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

exports.getRegister = (req, res) => {
  try {
    res.render("user/register.html", {
      error: req.query.error,
    });
  } catch (error) {
    next(error);
  }
};
exports.postRegister = async (req, res) => {
  try {
    const { nickname, id, pw } = req.body;
    const result = await userService.createUser(nickname, id, pw);
    if (!result) {
      return res.redirect("/users/register?error=이미 존재하는 ID입니다.");
    }
    res.redirect("/users/login");
  } catch (error) {
    next(error);
  }
};

exports.getPassword = (req, res) => {
  try {
    res.render("user/password.html", {
      error: req.query.error,
    });
  } catch (error) {
    next(error);
  }
};
exports.postPassword = async (req, res) => {
  try {
    const { nickname, id, newPw } = req.body;
    const result = await userService.updateUser(nickname, id, newPw);
    if (!result) {
      return res.redirect(
        "/users/password?error=계정 정보가 일치하지 않습니다."
      );
    }
    res.redirect("/users/login");
  } catch (error) {
    next(error);
  }
};

exports.getInfo = async (req, res) => {
  try {
    const result = await userService.selectUserWhereId(req.query.id);
    if (!result) {
      return res.redirect("/?error=존재하지 않는 계정입니다.");
    }
    res.render("user/info.html", {
      user: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const result = await userService.selectFollowings(req.query.id);
    res.render("user/following.html", {
      followings: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFollower = async (req, res) => {
  try {
    const result = await userService.selectFollowers(req.query.id);
    res.render("user/follwer.html", {
      followers: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getList = async (req, res) => {
  try {
    const result = await userService.selectBoards(req.query.id);
    res.render("user/list.html", {
      boards: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
