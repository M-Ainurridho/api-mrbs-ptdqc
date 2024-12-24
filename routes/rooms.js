import express from "express";
import {
  createRoomHandler,
  deleteRoomByIdHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomByIdHandler,
} from "../controllers/rooms.js";
import { roomsValidation } from "../middleware/validation.js";

const app = express.Router();

app.get("/", getAllRoomsHandler);
app.get("/:id", getRoomByIdHandler);
app.post("/", roomsValidation, createRoomHandler);
app.patch("/:id", updateRoomByIdHandler);
app.delete("/:id", deleteRoomByIdHandler);
export default app;
