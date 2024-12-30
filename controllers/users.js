import { nanoid } from "nanoid";
import { InternalServerError, StatusOK } from "../response.js";
import { datetimeFormat } from "../utils/dates.js";
import { comparePassword, createToken, hashPassword } from "../utils/hash.js";
import {
  createRole,
  createUser,
  deleteUserById,
  getAllRoles,
  getAllUsers,
  getCountUsers,
  getUserById,
  updateUserById,
} from "../models/users.js";
import { LIMIT } from "../middleware/counts.js";
import jwt from "jsonwebtoken";

// CRUD User
const getAllUsersHandler = async (req, res) => {
  const { page, query } = req.query;

  try {
    const response = await getAllUsers(page, query);
    const totalData = await getCountUsers(query);
    const totalPages = Math.ceil(totalData / LIMIT);

    const users = response.map((user) => {
      delete user.password;
      return { ...user };
    });

    res.status(200).json({
      ok: true,
      msg: "Get All Users",
      payload: { users, totalData, totalPages },
    });
  } catch {
    InternalServerError(res);
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await getUserById(id);

    if (users.length > 0) {
      delete users[0].password;

      res.status(200).json({
        ok: true,
        msg: "Get User By Id",
        payload: { user: users[0] },
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "Not Found",
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const createUserHandler = async (req, res) => {
  const id = nanoid(16);
  const createdAt = datetimeFormat();
  const updatedAt = createdAt;

  const data = { ...req.body, id, createdAt, updatedAt };
  data.password = hashPassword(data.password);

  try {
    const create = await createUser(data);

    if (create?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Create New User",
        payload: { userId: id },
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const updateUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const updatedAt = datetimeFormat();

  const data = { ...req.body, id, updatedAt };

  try {
    const update = await updateUserById(data);

    if (update?.changedRows) {
      res.status(200).json({
        ok: true,
        msg: "Update User Data",
        payload: { userId: id },
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "Not Found (user id)",
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const deleteUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteUserById(id);

    if (deleted?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Delete User Data",
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "Not Found (user id)",
      });
    }
  } catch {
    InternalServerError(res);
  }
};

// CRUD Auth
const signinUserHandler = async (req, res) => {
  const data = { ...req.body };

  try {
    const users = await getUserById(data.username);

    if (users.length > 0) {
      const comPassword = comparePassword(data.password, users[0].password);
      if (comPassword) {
        const token = createToken(users[0].id);
        res
          .status(200)
          .json({
            ok: true,
            msg: "Successfuly signin",
            payload: { token, role: users[0].role },
          });
      } else {
        const errors = [
          {
            msg: "Wrong password",
            path: "password",
          },
        ];
        res.status(404).json({ ok: false, msg: "Bad Request", errors });
      }
    } else {
      const errors = [
        {
          value: data.username,
          msg: "Username not registered",
          path: "username",
        },
      ];
      res.status(404).json({ ok: false, msg: "Bad Request", errors });
    }
  } catch {
    InternalServerError(res);
  }
};

const exchangeTokenHandler = async (req, res) => {
  // const { userId } = req;

  // try {
  //   const users = await getUserById(userId);

  //   if (users.length > 0) {
  //     delete users[0].password;

  //     res.status(200).json({
  //       ok: true,
  //       msg: "Get User By Token",
  //       payload: { user: users[0] },
  //     });
  //   }
  // } catch {
  //   InternalServerError(res);
  // }
  const { token } = req.body;

  jwt.verify(token, "ptdqcpassword", function (err, decoded) {
    if (err) {
      res.status(404).json({
        ok: false,
        msg: "Not Found (token)",
      });
    } else {
      StatusOK(res, "Exchange token", { userId: decoded.id });
    }
  });
};

// CRUD Role
const getAllRolesHandler = async (req, res) => {
  try {
    const roles = await getAllRoles();

    res.status(200).json({
      ok: true,
      msg: "Get All Roles",
      payload: { roles },
    });
  } catch {
    InternalServerError(res);
  }
};

const createRoleHandler = async (req, res) => {
  const id = nanoid(16);
  const createdAt = datetimeFormat();
  const updatedAt = createdAt;

  const data = { ...req.body, id, createdAt, updatedAt };

  try {
    const create = await createRole(data);

    if (create?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Create New Role",
        payload: { roleId: id },
      });
    }
  } catch {
    InternalServerError(res);
  }
};

export {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  signinUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  exchangeTokenHandler,
  getAllRolesHandler,
  createRoleHandler,
};
