import { nanoid } from "nanoid";
import { InternalServerError } from "../response.js";
import { datetimeFormat } from "../utils/dates.js";
import { hashPassword } from "../utils/hash.js";
import { createUser, getAllUsers, getUserById } from "../models/users.js";

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();

    const users = response.map((user) => {
      delete user.password;
      return { ...user };
    });

    res.status(200).json({
      ok: true,
      msg: "Get All Users",
      payload: { users },
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
  const roleId = "yrufjdhtqoplgjky";

  const data = { ...req.body, id, roleId, createdAt, updatedAt };
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
  try {
  } catch {
    InternalServerError(res);
  }
};

const deleteUserByIdHandler = async (req, res) => {
  try {
  } catch {
    InternalServerError(res);
  }
};

export {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
