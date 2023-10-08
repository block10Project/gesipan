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
    return await mainRepository.selectBoards();
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
