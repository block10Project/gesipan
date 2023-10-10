const pool = require("../../pool");

exports.createBoard = async (title, content, userUid) => {
  try {
    const sql = `
    insert into boards values(default, ?, ?, default, default, ?)
    `;
    const [result] = await pool.query(sql, [title, content, userUid]);
    return result.insertId;
  } catch (error) {
    throw new Error("[sql] createBoard error: ", error.message);
  }
};

exports.selectBoard = async (id) => {
  try {
    const sql = `
    select * from boards where uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    if (result) {
      const updateView = `
        update boards set views = views + 1 where uid = ?
        `;
      await pool.query(updateView, [id]);
    }
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoard error: ", error.message);
  }
};

exports.selectBoardWhereUserUid = async (id, userUid) => {
  try {
    const sql = `
      select * 
      from boards 
      where uid = ? and board_user_uid = ?
    `;
    const [[result]] = await pool.query(sql, [id, userUid]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoardWhereUserUid error: ", error.message);
  }
};

exports.updateBoard = async (id, title, content) => {
  try {
    const sql = `
    update boards set title = ?, content = ? where uid = ?
    `;
    const result = await pool.query(sql, [title, content, id]);
    return result;
  } catch (error) {
    throw new Error("[sql] updateBoard error: ", error.message);
  }
};

exports.deleteBoard = async (id) => {
  try {
    const sql = `
    delete from boards where uid = ?
    `;
    const result = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] deleteBoard error: ", error.message);
  }
};

exports.createComment = async (id, userUid, comment) => {
  try {
    const sql = `
    insert into comments values(?, ?, ?, default)
    `;
    const [result] = await pool.query(sql, [id, userUid, comment]);
    return result.insertId;
  } catch (error) {
    throw new Error("[sql] createComment error: ", error.message);
  }
};

exports.selectComments = async (id) => {
  try {
    const sql = `
    select * from comments where board_uid = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectComments error: ", error.message);
  }
};

exports.createGood = async (id, userUid) => {
  try {
    const selectUser = `
    select * 
    from users 
    where uid = ?
    `;
    const [[selectUserResult]] = await pool.query(selectUser, [id, userUid]);
    if (!selectUserResult) {
      return null;
    }

    const sql = `
    insert into goods values(?, ?)
    `;
    const [result] = await pool.query(sql, [id, userUid]);
    return result;
  } catch (error) {
    throw new Error("[sql] createGood error: ", error.message);
  }
};

exports.deleteGood = async (id, userUid) => {
  try {
    const selectUser = `
    select * 
    from users 
    where uid = ?
    `;
    const [[selectUserResult]] = await pool.query(selectUser, [id, userUid]);
    if (!selectUserResult) {
      return null;
    }

    const sql = `
    delete from goods 
    where board_uid = ? and good_user_uid = ?
    `;
    const [result] = await pool.query(sql, [id, userUid]);
    return result;
  } catch (error) {
    throw new Error("[sql] deleteGood error: ", error.message);
  }
};

exports.createFollow = async (id, userUid) => {
  try {
    const selectUser = `
    select * 
    from users 
    where uid = ?
    `;
    const [[selectUserResult]] = await pool.query(selectUser, [id]);
    if (!selectUserResult) {
      return null;
    }

    const sql = `
    insert into follows values(?, ?)
    `;
    const [result] = await pool.query(sql, [id, userUid]);
    return result.insertId;
  } catch (error) {
    throw new Error("[sql] createFollow error: ", error.message);
  }
};

exports.deleteFollow = async (id, userUid) => {
  try {
    const selectUser = `
    select * 
    from users 
    where uid = ?
    `;
    const [[selectUserResult]] = await pool.query(selectUser, [id]);
    if (!selectUserResult) {
      return null;
    }

    const sql = `
      delete from follows 
      where followed_user_uid = ? and following_user_uid = ?
      `;
    const result = await pool.query(sql, [id, userUid]);
    return result;
  } catch (error) {
    throw new Error("[sql] deleteFollow error: ", error.message);
  }
};

exports.selectGoodUser = async (board_uid, user_uid) => {
  try {
    const sql = `
    select * 
    from goods 
    where board_uid = ? and good_user_uid = ?
    `;
    const [[result]] = await pool.query(sql, [board_uid, user_uid]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectGoodUser error: ", error.message);
  }
};

exports.selectFollowingUser = async (board_user_uid, user_uid) => {
  try {
    const sql = `
    select * 
    from follows 
    where followed_user_uid = ? and following_user_uid = ?
    `;
    const [[result]] = await pool.query(sql, [board_user_uid, user_uid]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectFollowingUser error: ", error.message);
  }
};

exports.selectBoardGoods = async (id) => {
  try {
    const sql = `
    select count(*) 
    from goods 
    group by board_uid 
    having board_uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoardGoods: ", error.message);
  }
};

exports.selectUserNickname = async (id) => {
  try {
    const sql = `
    select nickname 
    from users 
    where uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserNickname: ", error.message);
  }
};
