import connection from "../config/db.js";

// CRUD User
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
      `SELECT * FROM users WHERE id = '${id}' OR username = '${id.toLowerCase()}' OR email = '${id}'`
    );
    return results;
  } catch (err) {
    console.log(err);
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
    const [results] = await connection.query(
      `UPDATE users SET 
      username = '${data.username}',
      email = '${data.email}',
      roleId = '${data.roleId}',
      updatedAt = '${data.updatedAt}'
      WHERE id = '${data.id}'
      `
    );

    return results;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (id) => {
  try {
    const [results] = await connection.query(
      `DELETE FROM users WHERE id = '${id}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

// CRUD Role
const createRole = async (data) => {
  try {
    const [results] = await connection.query(
      `INSERT INTO roles VALUES(
      '${data.id}', 
      '${data.role.toLowerCase()}', 
      '${data.createdAt}', 
      '${data.updatedAt}'
      )`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  createRole,
};
