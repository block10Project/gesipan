const mainRepository = require("../repository/main.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUserUid = async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies, "subin");
    return await mainRepository.selectUserUid(payload.id);
  } catch (error) {
    throw new Error("selectUserUid error: ", error.message);
  }
};

exports.selectBoards = async (req, res) => {
  try {
    if (!req.query.id) {
      req.query.id = 1;
    } else {
      req.query.id = Number(req.query.id);
    }
    if (req.query.keyword) {
      return await mainRepository.selectBoardsWhereKeyword(
        req.query.keyword,
        req.query.id
      );
    }
    return await mainRepository.selectBoards(req.query.id);
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
