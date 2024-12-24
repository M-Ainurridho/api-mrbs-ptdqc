import { nanoid } from "nanoid";
import { dateFormat, datetimeFormat } from "../utils/dates.js";
import {
  getAllBookings,
  getBookingById,
  createBooking,
} from "../models/bookings.js";
import { InternalServerError } from "../response.js";

const getAllBookingsHandler = async (req, res) => {
  try {
    const response = await getAllBookings();

    const bookings = response.map((booking) => {
      if (booking.recurring) {
        return {
          ...booking,
          startRecur: dateFormat(booking.startRecur),
          endRecur: dateFormat(booking.endRecur),
          recurring: Boolean(booking.recurring),
          daysOfWeek: booking.daysOfWeek.split(",").map((day) => Number(day)),
        };
      } else {
        return {
          id: booking.id,
          title: booking.title,
          start: `${dateFormat(booking.startRecur)}T${booking.startTime}`,
          end: `${dateFormat(booking.endRecur)}T${booking.endTime}`,
          description: booking.description,
          resourceId: booking.resourceId,
          recurring: Boolean(booking.recurring),
        };
      }
    });

    res.status(200).json({
      ok: true,
      msg: "Get All Bookings",
      payload: { bookings },
    });
  } catch {
    InternalServerError(res);
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
    InternalServerError(res);
  }
};

const createBookingHandler = async (req, res) => {
  const id = nanoid(16);
  const createdAt = datetimeFormat();
  const updatedAt = createdAt;

  const data = { ...req.body, id, createdAt, updatedAt };

  console.log(data);
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
    InternalServerError(res);
  }
};

const updateBookingByIdHandler = async (req, res) => {};

const deleteBookingByIdHandler = async (req, res) => {};

const getAllEventsHandler = async (req, res) => {
  try {
    const events = await getAllBookings();
    res.status(200).json({
      ok: true,
      msg: "Get All Event",
      payload: { events: events },
    });
  } catch {
    InternalServerError(res);
  }
};

export {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
  getAllEventsHandler,
};
