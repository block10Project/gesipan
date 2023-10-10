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
    return { result: result };
  } catch (error) {
    throw new Error("createBoard error: ", error.message);
  }
};

exports.selectBoard = async (id) => {
  try {
    const result = await boardRepository.selectBoard(id);
    if (!result) {
      return { message: "존재하지 않는 글입니다." };
    }
    return { result: result };
  } catch (error) {
    throw new Error("selectBoard error: ", error.message);
  }
};

exports.updateBoard = async (id, title, content, userUid) => {
  try {
    if (!title) {
      return { message: "제목을 입력해주세요." };
    }
    if (!content) {
      return { message: "내용을 입력해주세요." };
    }
    const compareId = boardRepository.selectBoardWhereUserUid(id, userUid);
    if (!compareId) {
      return { message: "잘못된 접근입니다." };
    }
    const result = await boardRepository.updateBoard(id, title, content);
    if (result) {
      return { message: "수정했습니다." };
    }
    return { message: "오류가 발생했습니다." };
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.deleteBoard = async (id, userUid) => {
  try {
    const compareId = boardRepository.selectBoardWhereUserUid(id, userUid);
    if (!compareId) {
      return { message: "잘못된 접근입니다." };
    }
    const result = await boardRepository.deleteBoard(id);
    if (!result) {
      return { message: "삭제했습니다." };
    }
    return { message: "삭제에 실패했습니다." };
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.createComment = async (id, userUid, comment) => {
  try {
    if (!comment) {
      return { message: "댓글을 입력해주세요." };
    }
    if (!userUid) {
      return { message: "로그인이 필요합니다." };
    }
    const result = await boardRepository.createComment(id, userUid, comment);
    return { result: result, message: "댓글을 작성했습니다." };
  } catch (error) {
    throw new Error("updateBoard error: ", error.message);
  }
};

exports.selectComments = async (id) => {
  try {
    const result = await boardRepository.selectComments(id);
    return { result: result };
  } catch (error) {
    throw new Error("selectComments error: ", error.message);
  }
};

exports.createGood = async (id, userUid) => {
  try {
    const boardResult = await boardRepository.selectBoard(id);
    if (!boardResult) {
      return { message: "존재하지 않는 글입니다." };
    }
    const result = await boardRepository.createGood(id, userUid);
    if (result) {
      return { message: "이미 추천한 글입니다." };
    } else {
      return { message: "추천했습니다." };
    }
  } catch (error) {
    throw new Error("createGood error: ", error.message);
  }
};

exports.createFollow = async (id, userUid) => {
  try {
    const followingResult = await boardRepository.createFollow(id, userUid);
    if (!followingResult) {
      return { message: "존재하지 않는 사용자입니다." };
    }
    return { message: "팔로우했습니다." };
  } catch (error) {
    throw new Error("createFollow error: ", error.message);
  }
};

exports.deleteFollow = async (id, userUid) => {
  try {
    const followingResult = await boardRepository.deleteFollow(id, userUid);
    if (!followingResult) {
      return { message: "존재하지 않는 사용자입니다." };
    }
    return { message: "팔로우를 취소했습니다." };
  } catch (error) {
    throw new Error("createFollow error: ", error.message);
  }
};

exports.selectGoodUser = async (board_uid, user_uid) => {
  try {
    const result = await boardRepository.selectGoodUser(board_uid, user_uid);
    return { result: result };
  } catch (error) {
    throw new Error("selectGoodUser error: ", error.message);
  }
};

exports.selectFollowingUser = async (board_user_uid, user_uid) => {
  try {
    const result = await boardRepository.selectFollowingUser(
      board_user_uid,
      user_uid
    );
    return { result: result };
  } catch (error) {
    throw new Error("selectFollowingUser error: ", error.message);
  }
};
