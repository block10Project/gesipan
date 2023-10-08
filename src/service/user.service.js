const userRepository = require("../repository/user.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUserWhereIdPw = async (id, pw) => {
  try {
    const result = await userRepository.selectUserWhereIdPw(id, pw);
    if (!result) {
      return { isLogin: false, data: null };
    }
    const token = jwt.sign({ id: result.id });
    return { isLogin: true, data: token };
  } catch (error) {
    throw new Error("selectUserWhereIdPw error: ", error.message);
  }
};

exports.selectUser = async (id) => {
  try {
    const result = await userRepository.selectUser(id);
    if (result) {
      result.followings = await userRepository.selectUserFollowings(id);
      result.followers = await userRepository.selectUserFollowers(id);
      result.boards = await userRepository.selectUserBoards(id);
      result.comments = await userRepository.selectUserComments(id);
    }
    return result;
  } catch (error) {
    throw new Error("selectUser error: ", error.message);
  }
};

exports.createUser = async (nickname, id, pw) => {
  try {
    const result = await userRepository.selectUser(id);
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
