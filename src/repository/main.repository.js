const pool = require("../../pool");

exports.selectUserUid = async (id) => {
  try {
    const sql = `
    select uid 
    from users 
    where id = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectUserUid error: ", error.message);
  }
};

exports.selectPages = async () => {
  try {
    const sql = `
    select * 
    from boards 
    `;
    const [result] = await pool.query(sql, []);
    return result;
  } catch (error) {
    throw new Error("[sql] selectPages error: ", error.message);
  }
};

exports.selectBoards = async (id) => {
  try {
    const sql = `
    select * 
    from boards 
    order by uid limit ?, 10
    `;
    const [result] = await pool.query(sql, [(id - 1) * 10]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoards error: ", error.message);
  }
};

exports.selectBoardsWhereKeyword = async (keyword, id) => {
  try {
    const sql = `
    select * 
    from boards 
    where title like ? 
    order by uid limit ?, 10
    `;
    const [[result]] = await pool.query(sql, [`%${keyword}%`, (id - 1) * 10]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoardsWhereKeyword error: ", error.message);
  }
};

exports.selectBoardGoods = async (id) => {
  try {
    const sql = `
    select count(good_user_uid) as goods 
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

exports.selectBoardComments = async (id) => {
  try {
    const sql = `
    select count(*) as comments 
    from comments 
    group by board_uid 
    having board_uid = ?
    `;
    const [[result]] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error("[sql] selectBoardComments: ", error.message);
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
