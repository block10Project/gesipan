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
    `;
  } catch (error) {
    throw new Error("[sql] selectUser error: ", error.message);
  }
};

exports.selectFollowings = async (id) => {
  try {
    const sql = `
    select uid, nickname 
    from users 
    where uid = any (
        select following_user_uid 
        from followings 
        where user_uid = ?
    )`;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectuserFollowings error: ", error.message);
  }
};

exports.selectFollowers = async (id) => {
  try {
    const sql = `
    select uid, nickname 
    from users 
    where uid = any (
        select following_user_uid 
        from followers 
        where user_uid = ?
    )`;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectuserFollowers error: ", error.message);
  }
};

exports.selectUserFollowings = async (id) => {
  try {
    const sql = `
    select count(following_user_uid) 
    from followings 
    group by user_uid 
    having user_uid = ?
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
      from followers 
      group by user_uid 
      having user_uid = ?
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
      group by comment_user_uid 
      having comment_user_uid = ?
      `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserFollowers error: ", error.message);
  }
};
