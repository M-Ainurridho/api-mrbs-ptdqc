import { nanoid } from "nanoid";
import { dateFormat, datetimeFormat } from "../utils/dates.js";
import {
  getAllBookings,
  getBookingById,
  createBooking,
} from "../models/bookings.js";

const getAllBookingsHandler = async (req, res) => {
  try {
    const response = await getAllBookings();

    const bookings = response.map((booking) => {
      return {
        ...booking,
        startRecur: dateFormat(booking.startRecur),
        endRecur: dateFormat(booking.endRecur),
        recurring: Boolean(booking.recurring),
        daysOfWeek: booking?.daysOfWeek
          ? booking.daysOfWeek.split(",").map((day) => Number(day))
          : [],
      };
    });

    res.status(200).json({
      ok: true,
      msg: "Get All Bookings",
      payload: { bookings },
    });
  } catch {
    res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

const getBookingByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await getBookingById(id);

    if (booking.length > 0) {
      res.status(200).json({
        ok: true,
        msg: "Get Booking By Id",
        payload: { booking: booking[0] },
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "Not Found",
      });
    }
  } catch {
    res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

const createBookingHandler = async (req, res) => {
  const id = nanoid(16);
  const createdAt = datetimeFormat();
  const updatedAt = createdAt;
  const userId = "dafjhhslf";

  const data = { ...req.body, id, createdAt, updatedAt, userId };

  if (!data.recurring) {
    data.endRecur = data.startRecur;
  }

  try {
    const create = await createBooking(data);

    if (create?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Create Booking Event",
        payload: { bookingId: id },
      });
    }
  } catch {
    res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

const updateBookingByIdHandler = async (req, res) => {};

const deleteBookingByIdHandler = async (req, res) => {};

export {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
};
