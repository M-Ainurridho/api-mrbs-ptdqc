import express from "express";
import roomsRoute from "./rooms.js";
import bookingsRoute from "./bookings.js";
import usersRoute from "./users.js";

const app = express.Router();

app.use("/rooms", roomsRoute);
app.use("/bookings", bookingsRoute);
app.use("/users", usersRoute);

export default app;
