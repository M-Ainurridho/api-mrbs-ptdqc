import connection from "../config/db.js";

const getAllBookings = async () => {
  try {
    const [results] = await connection.query(`SELECT * FROM bookings`);
    return results;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBookingById = async (id) => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM bookings WHERE id = '${id}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const createBooking = async (data) => {
  try {
    const [results] = await connection.query(
      `INSERT INTO bookings 
        VALUES(
        '${data.id}', 
        '${data.title}', 
        '${data.description}', 
        '${data.startRecur}', 
        '${data.endRecur}', 
        '${data.startTime}', 
        '${data.endTime}', 
        '${data.resourceId}', 
        '${data.userId}', 
         ${data.recurring}, 
        '${data.daysOfWeek}', 
        '${data.createdAt}', 
        '${data.updatedAt}'
        )`
    );
    return results;
  } catch (err) {
    throw err;
  }
};
const updateBookingById = async (data) => {
  try {
  } catch {}
};

const deleteBookingById = async (id) => {
  try {
  } catch {}
};

export {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  deleteBookingById,
};
