import express from "express";
import { registerValidation } from "../middleware/validation.js";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
} from "../controllers/users.js";

const app = express.Router();

app.get("/", getAllUsersHandler);
app.get("/:id", getUserByIdHandler);
app.post("/", registerValidation, createUserHandler);

export default app;
