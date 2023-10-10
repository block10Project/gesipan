const mainRepository = require("../repository/main.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUserUid = async (req) => {
  try {
    if (req.cookies.token) {
      const payload = jwt.verify(req.cookies.token, "subin");
      const result = await mainRepository.selectUserUid(payload.id);
      return { result: result };
    }
    return { message: "로그인이 필요합니다." };
  } catch (error) {
    throw new Error("selectUserUid error: ", error.message);
  }
};

exports.selectBoards = async (req) => {
  try {
    if (!req.query.id) {
      req.query.id = 1;
    } else {
      req.query.id = Number(req.query.id);
    }
    if (req.query.keyword) {
      const result = await mainRepository.selectBoardsWhereKeyword(
        req.query.keyword,
        req.query.id
      );
      if (!result) {
        return { message: "검색 결과가 없습니다." };
      }

      for (let i = 0; i < result.length; i++) {
        result[i].created_at = result[i].created_at.toString();
        // result[i].goods = await mainRepository.selectBoardGoods(result[i].uid);
      }

      return { result: result };
    }
    const result = await mainRepository.selectBoards(req.query.id);
    for (let i = 0; i < result.length; i++) {
      result[i].created_at = result[i].created_at.toString();
      // result[i].goods = await mainRepository.selectBoardGoods(result[i].uid);
    }
    return { result: result };
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
