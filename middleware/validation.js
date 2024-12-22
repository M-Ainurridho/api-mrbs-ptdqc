import { body, validationResult } from "express-validator";

const bookingValidation = [
  body("title").trim().notEmpty().withMessage("Required"),
  body("description").trim(),
  body("startRecur")
    .trim()
    .custom((value) => {
      const splits = value.split("-");

      if (splits.length < 3) {
        throw new Error("Invalid date");
      }

      return true;
    }),
  body("startTime").trim().notEmpty().withMessage("Required"),
  body("endTime").trim().notEmpty().withMessage("Required"),
  body("resourceId").trim().notEmpty().withMessage("Required"),
  body("endRecur")
    .trim()
    .custom((value, { req }) => {
      const isRecurring = req.body.recurring;

      if (isRecurring) {
        const splits = value.split("-");

        if (splits.length < 3) {
          throw new Error("Invalid date");
        }

        if (req.body.startRecur) {
          const startDate = new Date(req.body.startRecur).getTime();
          const endDate = new Date(value).getTime();

          if (endDate < startDate) {
            throw new Error("at least the same as the start date");
          }
        }
      }

      return true;
    }),
  (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      res.status(400).json({
        ok: false,
        msg: "Bad Request",
        errors: results.errors,
      });
    } else {
      next();
    }
  },
];

const registerValidation = [
  body("username").trim().notEmpty().withMessage("Required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").trim().isLength({ min: 8 }).withMessage("Min 8 characters"),
  (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      res.status(400).json({
        ok: false,
        msg: "Bad Request",
        errors: results.errors,
      });
    } else {
      next();
    }
  },
];

export { bookingValidation, registerValidation };
