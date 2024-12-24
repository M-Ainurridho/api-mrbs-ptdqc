import connection from "../config/db.js";

const getAllRooms = async () => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM rooms ORDER BY room ASC`
    );
    return results;
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

export { getAllRooms, getRoomById, createRoom, updateRoomById, deleteRoomById };
