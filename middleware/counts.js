import connection from "../config/db.js";

export const LIMIT = 5;

const getRecordCount = async (table) => {
  try {
    const [results] = await connection.query(`SELECT COUNT(*) FROM ${table}`);
    return results[0]["COUNT(*)"];
  } catch (err) {
    throw err;
  }
};

export default getRecordCount;
