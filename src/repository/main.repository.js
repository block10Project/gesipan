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
