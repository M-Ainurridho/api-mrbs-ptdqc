import express from "express";
import {
  registerValidation,
  signinValidation,
  tokenValidation,
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
} from "../controllers/users.js";

const app = express.Router();

app.get("/", getAllUsersHandler);
app.get("/:id", getUserByIdHandler);
app.post("/", registerValidation, createUserHandler);
app.post("/login", signinValidation, signinUserHandler);
app.post("/exchangetoken", tokenValidation, exchangeTokenHandler);
app.patch("/:id", updateUserValidation, updateUserByIdHandler);
app.delete("/:id", deleteUserByIdHandler);

export default app;
