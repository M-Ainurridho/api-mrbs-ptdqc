import express from "express";
import {
  registerValidation,
  signinValidation,
  updateUserValidation,
} from "../middleware/validation.js";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  signinUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  exchangeTokenHandler,
  getAllRolesHandler,
  createRoleHandler,
} from "../controllers/users.js";

const app = express.Router();

app.get("/", getAllUsersHandler);
app.get("/roles", getAllRolesHandler);
app.get("/:id", getUserByIdHandler);
app.post("/", registerValidation, createUserHandler);
app.post("/login", signinValidation, signinUserHandler);
app.post("/roles", createRoleHandler);
app.post("/exchangetoken", exchangeTokenHandler);
app.patch("/:id", updateUserValidation, updateUserByIdHandler);
app.delete("/:id", deleteUserByIdHandler);

export default app;
