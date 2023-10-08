const pool = require("../../pool");

exports.selectUserWhereIdPw = async (id, pw) => {
  try {
    const sql = `
    select id 
    from users 
    where id = ? and pw = ?
    `;
    const [[result]] = await pool.query(sql, [id, pw]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserWhereIdPw error: ", error.message);
  }
};

exports.selectUser = async (id) => {
  try {
    const sql = `
    select uid, id, nickname 
    from users
    where uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUser error: ", error.message);
  }
};

exports.createUser = async (nickname, id, pw) => {
  try {
    const sql = `
    insert into users values(default, ?, ?, ?);
    `;
    const [[result]] = await pool.query(sql, [nickname, id, pw]);
    return result;
  } catch (error) {
    throw new Error("[sql] createUser error: ", error.message);
  }
};

exports.updateUser = async (nickname, id, newPw) => {
  try {
    const selectSql = `
    select uid 
    from users 
    where nickname = ? and id = ?
    `;
    const [[uid]] = await pool.query(selectSql, [nickname, id]);
    if (!uid) {
      return null;
    }

    const sql = `
    update users 
    set pw = ? 
    where uid = ?
    `;
    const [[result]] = await pool.query(sql, [newPw, uid]);
    return result;
  } catch (error) {
    throw new Error("[sql] updateUser error: ", error.message);
  }
};

exports.selectFollowings = async (id) => {
  try {
    const sql = `
    select uid, nickname 
    from users 
    where uid = any (
        select following_user_uid 
        from follows 
        where follower_user_uid = ?
    )`;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectFollowings error: ", error.message);
  }
};

exports.selectFollowers = async (id) => {
  try {
    const sql = `
    select uid, nickname 
    from users 
    where uid = any (
        select follower_user_uid 
        from follows 
        where following_user_uid = ?
    )`;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectFollowers error: ", error.message);
  }
};

exports.selectBoards = async (id) => {
  try {
    const sql = `
    select * 
    from boards 
    where board_user_uid = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoards error: ", error.message);
  }
};

exports.selectUserFollowings = async (id) => {
  try {
    const sql = `
    select count(following_user_uid) 
    from follows 
    group by follower_user_uid 
    having follower_user_uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserFollowings error: ", error.message);
  }
};

exports.selectUserFollowers = async (id) => {
  try {
    const sql = `
      select count(follower_user_uid) 
      from follows 
      group by follower_user_uid 
      having follower_user_uid = ?
      `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserFollowers error: ", error.message);
  }
};

exports.selectUserBoards = async (id) => {
  try {
    const sql = `
      select count(uid) 
      from boards 
      group by board_user_uid 
      having board_user_uid = ?
      `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserFollowers error: ", error.message);
  }
};

exports.selectUserComments = async (id) => {
  try {
    const sql = `
      select count(comment) 
      from comments 
      group by user_uid 
      having comment_user_uid = ?
      `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserFollowers error: ", error.message);
  }
};
