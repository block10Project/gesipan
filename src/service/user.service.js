const userRepository = require("../repository/user.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUser = async (id, pw) => {
  try {
    const result = await userRepository.selectUser(id, pw);
    if (!result) {
      return { isLogin: false, data: null };
    }
    const token = jwt.sign({ id: result.id });
    return { isLogin: true, data: token };
  } catch (error) {
    throw new Error("selectUser error: ", error.message);
  }
};

exports.selectUserWhereId = async (id) => {
  try {
    return await userRepository.selectUserWhereId(id);
  } catch (error) {
    throw new Error("selectUserWhereId error: ", error.message);
  }
};

exports.createUser = async (nickname, id, pw) => {
  try {
    const result = await userRepository.selectUserWhereId(id);
    if (result) {
      return null;
    }
    return await userRepository.createUser(nickname, id, pw);
  } catch (error) {
    throw new Error("createUser error: ", error.message);
  }
};

exports.updateUser = async (nickname, id, newPw) => {
  try {
    return await userRepository.updateUser(nickname, id, newPw);
  } catch (error) {
    throw new Error("updateUser error: ", error.message);
  }
};

exports.selectFollowings = async (id) => {
  try {
    return await userRepository.selectFollowings(id);
  } catch (error) {
    throw new Error("selectFollowings error: ", error.message);
  }
};

exports.selectFollowers = async (id) => {
  try {
    return await userRepository.selectFollowers(id);
  } catch (error) {
    throw new Error("selectFollowers error: ", error.message);
  }
};

exports.selectBoards = async (id) => {
  try {
    return await userRepository.selectBoards(id);
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
