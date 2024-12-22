import connection from "../config/db.js";

const getAllUsers = async () => {
  try {
    const [results] = await connection.query(`SELECT * FROM users`);
    return results;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM users WHERE id = '${id}' OR username = '${id.toLowerCase()}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const createUser = async (data) => {
  try {
    const [results] = await connection.query(
      `INSERT INTO users VALUES(
      '${data.id}', 
      '${data.username.toLowerCase()}', 
      '${data.email}', 
      '${data.password}', 
      '${data.roleId}', 
      '${data.createdAt}', 
      '${data.updatedAt}'
      )`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (data) => {
  try {
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id) => {
  try {
  } catch (err) {
    throw err;
  }
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
