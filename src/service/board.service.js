const boardRepository = require("../repository/board.repository");

exports.createBoard = async (title, content, userUid) => {
  try {
    if (!title) {
      return { message: "제목을 입력해주세요" };
    }
    if (!content) {
      return { message: "내용을 입력해주세요" };
    }
    const result = await boardRepository.createBoard(title, content, userUid);
    return result;
  } catch (error) {
    throw new Error("createBoard error: ", error.message);
  }
};

exports.selectBoard = async (id) => {
  try {
    return await boardRepository.selectBoard(id);
  } catch (error) {
    throw new Error("selectBoard error: ", error.message);
  }
};

exports.updateBoard = async (id, title, content, userUid) => {
  try {
    if (!title) {
      return "제목을 입력해주세요.";
    }
    if (!content) {
      return "내용을 입력해주세요.";
    }
    const compareId = boardRepository.selectBoardWhereUserUid(id, userUid);
    if (!compareId) {
      return "잘못된 접근입니다.";
    }
    const result = await boardRepository.updateBoard(id, title, content);
    if (result) {
      return "수정했습니다.";
    }
    return "오류가 발생했습니다.";
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.deleteBoard = async (id, userUid) => {
  try {
    const compareId = boardRepository.selectBoardWhereUserUid(id, userUid);
    if (!compareId) {
      return "잘못된 접근입니다.";
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

exports.createComment = async (id, userUid, comment) => {
  try {
    if (!comment) {
      return "댓글을 입력해주세요.";
    }
    if (!userUid) {
      return "로그인이 필요합니다";
    }
    return await boardRepository.createComment(id, userUid, comment);
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

exports.createGood = async (id, userUid) => {
  try {
    const boardResult = await boardRepository.selectBoard(id);
    if (!boardResult) {
      return null;
    }
    const result = await boardRepository.createGood(id, userUid);
    if (result) {
      return "이미 추천한 글입니다";
    } else {
      return "추천했습니다.";
    }
  } catch (error) {
    throw new Error("createGood error: ", error.message);
  }
};

exports.createFollow = async (id, userUid) => {
  try {
    const followingResult = await boardRepository.createFollow(id, userUid);
    if (!followingResult) {
      return "이미 팔로우했습니다.";
    }
    return "팔로우했습니다.";
  } catch (error) {
    throw new Error("createFollow error: ", error.message);
  }
};

exports.deleteFollow = async (id, userUid) => {
  try {
    const followingResult = await boardRepository.deleteFollow(id, userUid);
    if (!followingResult) {
      return "이미 팔로우를 취소했습니다.";
    }
    return "팔로우를 취소했습니다.";
  } catch (error) {
    throw new Error("createFollow error: ", error.message);
  }
};
