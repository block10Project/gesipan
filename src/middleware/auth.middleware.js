const JWT = require("../lib/jwt");
const userService = require("../service/user.service");
const jwt = new JWT();

exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next();
    }
    const payload = jwt.verify(token, "subin");
    const user = await userService.selectUserWhereId(payload.id);
    req.user = user.result;
    next();
  } catch (error) {
    next(error);
  }
};
