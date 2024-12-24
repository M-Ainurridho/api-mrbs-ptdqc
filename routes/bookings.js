import express from "express";
import { bookingValidation } from "../middleware/validation.js";
import {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  getAllEventsHandler,
} from "../controllers/bookings.js";

const app = express.Router();

app.get("/", getAllBookingsHandler);
app.get("/events", getAllEventsHandler);
app.get("/:id", getBookingByIdHandler);
app.post("/", bookingValidation, createBookingHandler);

export default app;
