import express from "express";
import { bookingValidation } from "../middleware/validation.js";
import {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  getAllEventsHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
  createPDF,
} from "../controllers/bookings.js";
import checkingDuplicateDate from "../middleware/duplicate.js";
import downloadPDF from "../middleware/download.js";

const app = express.Router();

app.get("/", getAllBookingsHandler);
app.get("/events/:id", getAllEventsHandler);
app.get("/generate-pdf", createPDF, downloadPDF);
app.get("/:id", getBookingByIdHandler);
app.post("/", bookingValidation, checkingDuplicateDate, createBookingHandler);
app.patch(
  "/:id",
  bookingValidation,
  checkingDuplicateDate,
  updateBookingByIdHandler
);
app.delete("/:id", deleteBookingByIdHandler);

export default app;
