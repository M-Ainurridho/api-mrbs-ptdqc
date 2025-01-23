import { nanoid } from "nanoid";
import { dateFormat, datetimeFormat } from "../utils/dates.js";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  getCountBookings,
  updateBookingById,
  deleteBookingById,
} from "../models/bookings.js";
import { InternalServerError } from "../response.js";
import { LIMIT } from "../middleware/counts.js";
import { getUserById } from "../models/users.js";
import puppeteer from "puppeteer";

const getAllBookingsHandler = async (req, res) => {
  try {
    const response = await getAllBookings();

    const bookings = response.map((booking) => {
      delete booking.password;
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
          username: booking.username,
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
      res.status(404).json({
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

const updateBookingByIdHandler = async (req, res) => {
  const { id } = req.params;
  const updatedAt = datetimeFormat();

  const data = { ...req.body, id, updatedAt };

  if (!data.recurring) {
    data.endRecur = data.startRecur;
  }

  try {
    const update = await updateBookingById(data);

    if (update?.changedRows) {
      res.status(200).json({
        ok: true,
        msg: "Update Event Data",
        payload: { bookingId: id },
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const deleteBookingByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteBookingById(id);

    if (deleted?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Successfully! Deleted Event",
        payload: { bookingId: id },
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const getAllEventsHandler = async (req, res) => {
  let { id } = req.params;
  const { page, query } = req.query;

  try {
    const user = await getUserById(id);
    if (user[0].role === "admin") {
      id = null;
    }

    const events = await getAllBookings(page, query, id);
    const totalData = await getCountBookings(query, id);
    const totalPages = Math.ceil(totalData / LIMIT);

    res.status(200).json({
      ok: true,
      msg: "Get All Event",
      payload: { events, totalData, totalPages },
    });
  } catch {
    InternalServerError(res);
  }
};

const createPDF = async (req, res, next) => {
  const { date } = req.query;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://192.168.5.37:5002/reports/print?date=${date}`);
  await page.waitForSelector("#root");

  await page.pdf({
    path: "assets/pdf/print-schedule.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  next();
};

export {
  getAllBookingsHandler,
  getBookingByIdHandler,
  createBookingHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
  getAllEventsHandler,
  createPDF,
};
