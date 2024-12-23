import express from "express";
import {
  registerValidation,
  updateUserValidation,
} from "../middleware/validation.js";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from "../controllers/users.js";

const app = express.Router();

app.get("/", getAllUsersHandler);
app.get("/:id", getUserByIdHandler);
app.post("/", registerValidation, createUserHandler);
app.patch("/:id", updateUserValidation, updateUserByIdHandler);
app.delete("/:id", deleteUserByIdHandler);

export default app;
