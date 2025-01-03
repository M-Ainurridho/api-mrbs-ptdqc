import connection from "../config/db.js";
import { LIMIT } from "../middleware/counts.js";

const getAllBookings = async (page = null, query = "", id) => {
  try {
    if (page) {
      const OFFSET = LIMIT * page - LIMIT;

      if (id) {
        const [results] = await connection.query(
          `SELECT *, bookings.id, bookings.title FROM bookings 
          INNER JOIN rooms ON bookings.resourceId = rooms.id
          WHERE bookings.userId = '${id}' AND (bookings.title LIKE '%${query}%' OR
          rooms.room LIKE '%${query}%' OR
          bookings.startRecur LIKE '%${query}%' OR
          bookings.endRecur LIKE '%${query}%' OR
          bookings.repeat LIKE '%${query}%')
          ORDER BY bookings.updatedAt DESC
          LIMIT ${LIMIT} OFFSET ${OFFSET}`
        );
        return results;
      } else {
        const [results] = await connection.query(
          `SELECT *, bookings.id, bookings.title FROM bookings 
          INNER JOIN rooms ON 
          bookings.resourceId = rooms.id
          WHERE bookings.title LIKE '%${query}%' OR
          rooms.room LIKE '%${query}%' OR
          bookings.startRecur LIKE '%${query}%' OR
          bookings.endRecur LIKE '%${query}%' OR
          bookings.repeat LIKE '%${query}%'
          ORDER BY bookings.updatedAt DESC
          LIMIT ${LIMIT} OFFSET ${OFFSET}`
        );
        return results;
      }
    } else {
      const [results] = await connection.query(
        `SELECT * FROM bookings ORDER BY updatedAt DESC`
      );
      return results;
    }
  } catch (err) {
    throw err;
  }
};

const getBookingById = async (id) => {
  try {
    const [results] = await connection.query(
      `SELECT *, bookings.id, bookings.title FROM bookings 
      INNER JOIN rooms ON bookings.resourceId = rooms.id 
      INNER JOIN users ON bookings.userId = users.id
      WHERE bookings.id = '${id}'`
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
        '${data.repeat}', 
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
    const [results] = await connection.query(
      `UPDATE bookings SET 
        title = '${data.title}',
        description = '${data.description}', 
        startRecur = '${data.startRecur}', 
        endRecur = '${data.endRecur}', 
        startTime = '${data.startTime}', 
        endTime = '${data.endTime}', 
        resourceId = '${data.resourceId}',
        recurring = ${data.recurring},
        bookings.repeat = '${data.repeat}',
        daysOfWeek = '${data.daysOfWeek}',
        updatedAt = '${data.updatedAt}'
        WHERE id = '${data.id}'
      `
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const deleteBookingById = async (id) => {
  try {
    const [results] = await connection.query(
      `DELETE FROM bookings WHERE id = '${id}' OR resourceId = '${id}'`
    );
    return results;
  } catch (err) {
    throw err;
  }
};

const getCountBookings = async (query, id) => {
  try {
    if (id) {
      const [results] = await connection.query(`
          SELECT COUNT(*) FROM bookings 
          INNER JOIN rooms ON 
          bookings.resourceId = rooms.id
          WHERE bookings.userId = '${id}' AND (bookings.title LIKE '%${query}%' OR
          rooms.room LIKE '%${query}%' OR
          bookings.startRecur LIKE '%${query}%' OR
          bookings.endRecur LIKE '%${query}%' OR
          bookings.repeat LIKE '%${query}%')
          `);
      return results[0]["COUNT(*)"];
    } else {
      const [results] = await connection.query(`
          SELECT COUNT(*) FROM bookings 
          INNER JOIN rooms ON 
          bookings.resourceId = rooms.id
          WHERE bookings.title LIKE '%${query}%' OR
          rooms.room LIKE '%${query}%' OR
          bookings.startRecur LIKE '%${query}%' OR
          bookings.endRecur LIKE '%${query}%' OR
          bookings.repeat LIKE '%${query}%'
          `);
      return results[0]["COUNT(*)"];
    }
  } catch (err) {
    throw err;
  }
};

const searchDuplicateEvent = async ({
  resourceId,
  startRecur,
  endRecur,
  recurring,
}) => {
  try {
    if (!recurring) {
      const [results] = await connection.query(
        `SELECT * FROM bookings 
        WHERE resourceId = '${resourceId}' AND startRecur = '${startRecur}'`
      );
      return results;
    }
  } catch (err) {
    throw err;
  }
};

export {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  deleteBookingById,
  getCountBookings,
  searchDuplicateEvent,
};
