import connection from "../config/db.js";
import { LIMIT } from "../middleware/counts.js";

const getAllRooms = async (limit = false, page = null, query = "") => {
  const OFFSET = LIMIT * page - LIMIT;

  try {
    if (limit) {
      const [results] = await connection.query(
        `SELECT * FROM rooms 
        WHERE room LIKE '%${query}%' OR 
        createdAt LIKE '%${query}%' 
        ORDER BY updatedAt DESC 
        LIMIT ${LIMIT} OFFSET ${OFFSET}`
      );
      return results;
    } else {
      const [results] = await connection.query(`SELECT * FROM rooms`);
      return results;
    }
  } catch (err) {
    throw err;
  }
};

const getRoomById = async (id) => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM rooms WHERE id = '${id}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const createRoom = async (data) => {
  try {
    const [results] = await connection.query(
      `INSERT INTO rooms 
        VALUES('${data.id}', '${data.room}', '${data.room}', '${data.createdAt}', '${data.updatedAt}')
      `
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const updateRoomById = async (data) => {
  try {
    const [results] = await connection.query(
      `UPDATE rooms SET 
      room = '${data.room}', 
      title = '${data.room}', 
      updatedAt = '${data.updatedAt}' 
      WHERE id = '${data.id}'
      `
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteRoomById = async (id) => {
  try {
    const [results] = await connection.query(
      `DELETE FROM rooms WHERE id = '${id}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const getCountRooms = async (query) => {
  try {
    const [results] = await connection.query(`
      SELECT COUNT(*) FROM rooms 
      WHERE room LIKE '%${query}%' OR 
      createdAt LIKE '%${query}%' 
      ORDER BY room ASC `);
    return results[0]["COUNT(*)"];
  } catch (err) {
    throw err;
  }
};

export {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoomById,
  deleteRoomById,
  getCountRooms,
};
