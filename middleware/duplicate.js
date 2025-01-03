import connection from "../config/db.js";
import { InternalServerError } from "../response.js";
import { dateFormat } from "../utils/dates.js";

const checkingDuplicateDate = async (req, res, next) => {
  const data = { ...req.body };

  if (!data.endRecur) {
    data.endRecur = data.startRecur;
  }

  try {
    const response = await searchBookingDuplicate(data);

    if (response.length > 0) {
      const noneAndDaily = response;

      const conflicts = [];
      const aDay = 1000 * 60 * 60 * 24; // 1 day

      const inputStartDate = new Date(data.startRecur).getTime(); // input start date in miliseconds
      const inputEndDate = new Date(data.endRecur).getTime(); // input end date in miliseconds

      for (let input = inputStartDate; input <= inputEndDate; input += aDay) {
        const isWeeklyInput = data.repeat === "weekly" ? true : false;
        const dateNumberInput = new Date(input).getDay();

        if (isWeeklyInput) {
          if (!data.daysOfWeek.includes(dateNumberInput)) {
            continue;
          }
        }

        for (let x = 0; x < noneAndDaily.length; x++) {
          const outputStartDate = new Date(
            noneAndDaily[x].startRecur
          ).getTime();
          const outputEndDate = new Date(noneAndDaily[x].endRecur).getTime();

          const isWeeklyOutput =
            noneAndDaily[x].repeat === "weekly" ? true : false;
          const daysOfWeekOutput = noneAndDaily[x].daysOfWeek
            .split(",")
            .map((num) => Number(num));

          for (
            let output = outputStartDate;
            output <= outputEndDate;
            output += aDay
          ) {
            const dateNumberOutput = new Date(output).getDay();

            if (isWeeklyOutput) {
              if (!daysOfWeekOutput.includes(dateNumberOutput)) {
                continue;
              }
            }

            if (dateFormat(input) === dateFormat(output)) {
              // input start date greater than output start date index ke-x
              if (data.startTime >= noneAndDaily[x].startTime) {
                if (data.startTime < noneAndDaily[x].endTime) {
                  conflicts.push({
                    date: dateFormat(output),
                    duration: `${noneAndDaily[x].startTime} - ${noneAndDaily[x].endTime}`,
                  });
                }
              }
              // input start date less than output start date index ke-x
              else {
                if (data.endTime > noneAndDaily[x].startTime) {
                  conflicts.push({
                    date: dateFormat(output),
                    duration: `${noneAndDaily[x].startTime} - ${noneAndDaily[x].endTime}`,
                  });
                }
              }
            }
          }
        }
      }

      const errors = [...conflicts];

      if (errors.length > 0) {
        res.status(409).json({
          ok: false,
          msg: "Conflicts",
          errors,
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    InternalServerError(res);
  }
};

const searchBookingDuplicate = async (data) => {
  try {
    const [results] = await connection.query(
      `SELECT * FROM bookings WHERE resourceId = '${data.resourceId}'`
    );
    return results;
  } catch (error) {
    throw error;
  }
};

export default checkingDuplicateDate;
