import express from "express";
import { bookingValidation } from "../middleware/validation.js";
import {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  getAllEventsHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
} from "../controllers/bookings.js";

const app = express.Router();

app.get("/", getAllBookingsHandler);
app.get("/events/:id", getAllEventsHandler);
app.get("/:id", getBookingByIdHandler);
app.post("/", bookingValidation, createBookingHandler);
app.patch("/:id", bookingValidation, updateBookingByIdHandler);
app.delete("/:id", deleteBookingByIdHandler);

export default app;
