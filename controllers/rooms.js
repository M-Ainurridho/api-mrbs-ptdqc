import { nanoid } from "nanoid";
import { datetimeFormat } from "../utils/dates.js";
import { InternalServerError, StatusOK } from "../response.js";
import {
  createRoom,
  deleteRoomById,
  getAllRooms,
  getCountRooms,
  getRoomById,
  updateRoomById,
} from "../models/rooms.js";
import { LIMIT } from "../middleware/counts.js";
import { deleteBookingById } from "../models/bookings.js";

const getAllRoomsHandler = async (req, res) => {
  const { page, query } = req.query;

  try {
    if (page) {
      const rooms = await getAllRooms(true, page, query);
      const totalData = await getCountRooms(query);
      const totalPages = Math.ceil(totalData / LIMIT);

      StatusOK(res, "Get All Rooms", { rooms, totalData, totalPages });
    } else {
      const rooms = await getAllRooms();
      StatusOK(res, "Get All Rooms", { rooms });
    }
  } catch {
    InternalServerError(res);
  }
};

const getRoomByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const rooms = await getRoomById(id);

    if (rooms.length > 0) {
      res.status(200).json({
        ok: true,
        msg: "Get Room By Id",
        payload: { room: rooms[0] },
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "Not Found (room id)",
      });
    }
  } catch {
    InternalServerError(res);
  }
};

const createRoomHandler = async (req, res) => {
  const id = nanoid(16);
  const createdAt = datetimeFormat();
  const updatedAt = createdAt;
  const data = { ...req.body, id, createdAt, updatedAt };

  try {
    const create = await createRoom(data);

    if (create?.affectedRows) {
      StatusOK(res, "Create New Room", { roomId: id });
    }
  } catch {
    InternalServerError(res);
  }
};

const updateRoomByIdHandler = async (req, res) => {
  const { id } = req.params;
  const updatedAt = datetimeFormat();
  const data = { ...req.body, id, updatedAt };

  try {
    const update = await updateRoomById(data);

    if (update?.changedRows) {
      StatusOK(res, "Updated Room", { roomId: id });
    }
  } catch {
    InternalServerError(res);
  }
};

const deleteRoomByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteRoomById(id);
    await deleteBookingById(id);

    if (deleted?.affectedRows) {
      res.status(200).json({
        ok: true,
        msg: "Deleted Room Data",
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "Not Found (room id)",
      });
    }
  } catch {
    InternalServerError(res);
  }
};

export {
  getAllRoomsHandler,
  getRoomByIdHandler,
  createRoomHandler,
  updateRoomByIdHandler,
  deleteRoomByIdHandler,
};
