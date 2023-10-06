const mainRepository = require("../repository/main.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUserUid = async (req, res) => {
  try {
    const result = jwt.verity(req.cookies, "subin");
    return await mainRepository.selectUserUid(result);
  } catch (error) {
    throw new Error("selectUserUid error: ", error.message);
  }
};

exports.selectUserFollowings = async (req, res) => {
  try {
    const result = jwt.verity(req.cookies, "subin");
    return await mainRepository.selectUserFollowings(result);
  } catch (error) {
    throw new Error("selectUserFollowings error: ", error.message);
  }
};

exports.selectBoards = async (req, res) => {
  try {
    return await mainRepository.selectBoards();
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
