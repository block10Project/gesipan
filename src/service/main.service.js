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
        let getValues = await mainRepository.selectBoardGoods(result[i].uid);
        result[i].goods = getValues ? getValues.goods : 0;
        getValues = await mainRepository.selectBoardComments(result[i].uid);
        result[i].comments = getValues ? getValues.comments : 0;
        getValues = await mainRepository.selectUserNickname(
          result[i].board_user_uid
        );
        result[i].nickname = getValues ? getValues.nickname : "익명";
        result[i].date = result[i].created_at.toISOString().split("T")[0];
        result[i].time = [
          result[i].created_at.toISOString().split("T")[1].split(":")[0],
          result[i].created_at.toISOString().split("T")[1].split(":")[1],
        ].join(":");
      }

      return { result: result };
    }
    const result = await mainRepository.selectBoards(req.query.id);
    for (let i = 0; i < result.length; i++) {
      let getValues = await mainRepository.selectBoardGoods(result[i].uid);
      result[i].goods = getValues ? getValues.goods : 0;
      getValues = await mainRepository.selectBoardComments(result[i].uid);
      result[i].comments = getValues ? getValues.comments : 0;
      getValues = await mainRepository.selectUserNickname(
        result[i].board_user_uid
      );
      result[i].nickname = getValues ? getValues.nickname : "익명";
      result[i].date = result[i].created_at.toISOString().split("T")[0];
      result[i].time = [
        result[i].created_at.toISOString().split("T")[1].split(":")[0],
        result[i].created_at.toISOString().split("T")[1].split(":")[1],
      ].join(":");
    }
    return { result: result };
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
