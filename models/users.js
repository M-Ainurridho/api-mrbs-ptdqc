import connection from "../config/db.js";
import { LIMIT } from "../middleware/counts.js";

// CRUD User
const getAllUsers = async (page = null, query = "") => {
  const OFFSET = LIMIT * page - LIMIT;

  try {
    const [results] = await connection.query(`
      SELECT *, users.id FROM users INNER JOIN roles ON users.roleId = roles.id WHERE users.username LIKE '%${query}%' OR users.email LIKE '%${query}%' OR roles.role LIKE '%${query}%' ORDER BY users.updatedAt DESC LIMIT ${LIMIT} OFFSET ${OFFSET}
      `);
    return results;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const [results] = await connection.query(
      `SELECT *, users.id FROM users 
        INNER JOIN roles ON users.roleId = roles.id 
        WHERE users.id = '${id}' OR 
        users.username = '${id.toLowerCase()}' OR 
        users.email = '${id}'
      `
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
const getAllRoles = async () => {
  try {
    const [results] = await connection.query(`
      SELECT * FROM roles ORDER BY updatedAt ASC`);
    return results;
  } catch (err) {
    throw err;
  }
};

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

const getCountUsers = async (query = "") => {
  try {
    const [results] = await connection.query(`
      SELECT COUNT(*) FROM users INNER JOIN roles ON users.roleId = roles.id 
      WHERE users.username LIKE '%${query}%' OR 
      users.email LIKE '%${query}%' OR 
      roles.role LIKE '%${query}%'
      ORDER BY users.updatedAt DESC
    `);
    return results[0]["COUNT(*)"];
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
  getAllRoles,
  createRole,
  getCountUsers,
};
