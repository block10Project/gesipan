const userRepository = require("../repository/user.repository");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.selectUserWhereIdPw = async (id, pw) => {
  try {
    if (!id) {
      return { message: "아이디를 입력해주세요" };
    }
    if (!pw) {
      return { message: "비밀번호를 입력해주세요" };
    }
    const result = await userRepository.selectUserWhereIdPw(id, pw);
    if (!result) {
      return { isLogin: false, data: null };
    }
    const token = jwt.sign({ id });
    return { isLogin: true, data: token };
  } catch (error) {
    throw new Error("selectUserWhereIdPw error: ", error.message);
  }
};

exports.selectUserWhereId = async (id) => {
  try {
    if (id) {
      const result = await userRepository.selectUserWhereId(id);
      if (!result) {
        return { message: "존재하지 않는 계정입니다." };
      }
      if (result) {
        result.followings = await userRepository.selectUserFollowings(id);
        result.followers = await userRepository.selectUserFollowers(id);
        result.boards = await userRepository.selectUserBoards(id);
        result.comments = await userRepository.selectUserComments(id);
      }
      return { result: result };
    }
    return { message: "id가 누락되었습니다." };
  } catch (error) {
    throw new Error("selectUserWhereId error: ", error.message);
  }
};

exports.selectUser = async (id) => {
  try {
    if (id) {
      const result = await userRepository.selectUser(id);
      if (!result) {
        return { message: "존재하지 않는 계정입니다." };
      }
      if (result) {
        result.followings = await userRepository.selectUserFollowings(id);
        result.followers = await userRepository.selectUserFollowers(id);
        result.boards = await userRepository.selectUserBoards(id);
        result.comments = await userRepository.selectUserComments(id);
      }
      return { result: result };
    }
    return { message: "uid가 누락되었습니다." };
  } catch (error) {
    throw new Error("selectUser error: ", error.message);
  }
};

exports.createUser = async (nickname, id, pw) => {
  try {
    if (!nickname) {
      return { message: "닉네임을 입력해주세요" };
    }
    if (!id) {
      return { message: "아이디를 입력해주세요" };
    }
    if (!pw) {
      return { message: "비밀번호를 입력해주세요" };
    }
    const checkUser = await userRepository.selectUser(id);
    if (checkUser) {
      return { message: "이미 존재하는 아이디입니다." };
    }
    const result = await userRepository.createUser(nickname, id, pw);
    return { result: result, message: "회원가입에 성공했습니다." };
  } catch (error) {
    throw new Error("createUser error: ", error.message);
  }
};

exports.updateUser = async (nickname, id, newPw) => {
  try {
    const result = await userRepository.updateUser(nickname, id, newPw);
    if (!result) {
      return { message: "계정 정보가 일치하지 않습니다." };
    }
    return { result: result, message: "비밀번호를 변경했습니다." };
  } catch (error) {
    throw new Error("updateUser error: ", error.message);
  }
};

exports.selectFollowings = async (id) => {
  try {
    const result = await userRepository.selectFollowings(id);
    return { result: result };
  } catch (error) {
    throw new Error("selectFollowings error: ", error.message);
  }
};

exports.selectFollowers = async (id) => {
  try {
    const result = await userRepository.selectFollowers(id);
    return { result: result };
  } catch (error) {
    throw new Error("selectFollowers error: ", error.message);
  }
};

exports.selectBoards = async (id) => {
  try {
    const result = await userRepository.selectBoards(id);
    return { result: result };
  } catch (error) {
    throw new Error("selectBoards error: ", error.message);
  }
};
