const boardRepository = require("../repository/board.repository");
const mainService = require("./main.service");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.createBoard = async (title, content) => {
  try {
    return await boardRepository.createBoard(title, content);
  } catch (error) {
    throw new Error("createBoard error: " + error.message);
  }
};

exports.selectBoard = async (id) => {
  try {
    return await boardRepository.selectBoard(id);
  } catch (error) {
    throw new Error("selectBoard error: ", error.message);
  }
};

exports.updateBoard = async (id, title, content) => {
  try {
    const userId = mainService.selectUserUid();
    const compareId = boardRepository.selectBoardWhereUserId(id, userId);
    if (!compareId) {
      return null;
    }
    const result = await boardRepository.updateBoard(id, title, content);
    if (result) {
      return "수정했습니다.";
    }
    return "내용을 입력해주세요.";
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.deleteBoard = async (id) => {
  try {
    const userId = mainService.selectUserUid();
    const compareId = boardRepository.selectBoardWhereUserId(id, userId);
    if (!compareId) {
      return null;
    }
    const result = await boardRepository.deleteBoard(id);
    if (!result) {
      return "삭제했습니다.";
    }
    return "삭제에 실패했습니다.";
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.createComment = async (id, comment) => {
  try {
    return await boardRepository.createComment(id, comment);
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.selectComments = async (id) => {
  try {
    return await boardRepository.selectComments(id);
  } catch (error) {
    throw new Error("selectComments error: ", error.message);
  }
};

exports.createGood = async (id) => {
  try {
    const boardResult = await boardRepository.selectBoard(id);
    if (!boardResult) {
      return null;
    }
    const result = await boardRepository.createGood(id);
    if (result) {
      return "이미 추천한 글입니다";
    } else {
      return "추천했습니다.";
    }
  } catch (error) {
    throw new Error("createGood error: ", error.message);
  }
};

exports.createFollowing = async (id) => {
  try {
    const followingResult = await boardRepository.createFollowing(id);
    if (followingResult) {
      return "팔로우했습니다.";
    }
    return "다시 시도해주세요.";
  } catch (error) {
    throw new Error("createFollowing error: ", error.message);
  }
};

exports.deleteFollowing = async (id) => {
  try {
    const followingResult = await boardRepository.deleteFollowing(id);
    if (!followingResult) {
      return "팔로우를 취소했습니다.";
    }
    return "다시 시도해주세요.";
  } catch (error) {
    throw new Error("createFollowing error: ", error.message);
  }
};
