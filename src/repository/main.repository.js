const pool = require("../../pool");

exports.selectUserUid = async (id) => {
  try {
    const sql = `select uid from users where id = ?`;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserUid error: ", error.message);
  }
};

exports.selectUserFollowings = async (id) => {
  try {
    const sql = `select uid, nickname from users where uid = any (select following_user_uid from followings where user_uid = ?)`;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectuserFollowings error: ", error.message);
  }
};

exports.selectBoards = async () => {
  try {
    const sql = `select * from boards`;
    const [result] = await pool.query(sql, []);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoards error: ", error.message);
  }
};
