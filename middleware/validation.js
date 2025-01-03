import { body, validationResult } from "express-validator";
import { getUserById } from "../models/users.js";

const bookingValidation = [
  body("title").trim().notEmpty().withMessage("Please choose a title"),
  body("description").trim(),
  body("startRecur")
    .trim()
    .custom((value) => {
      const splits = value.split("-");

      if (splits.length < 3) {
        throw new Error("Please provide a valid date");
      }

      return true;
    }),
  body("startTime").trim().notEmpty().withMessage("Invalid time"),
  body("endTime").trim().notEmpty().withMessage("Invalid time"),
  body("resourceId").trim().notEmpty().withMessage("Required"),
  body("endRecur")
    .trim()
    .custom((value, { req }) => {
      const isRecurring = req.body.recurring;

      if (isRecurring) {
        const splits = value.split("-");

        if (splits.length < 3) {
          throw new Error("Please provide a valid date");
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
  body("username").trim().notEmpty().withMessage("Please choose a username."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom(async (value) => {
      const isExist = await getUserById(value);

      if (isExist.length > 0) {
        throw new Error("Email is already registered");
      }

      return true;
    }),
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

const signinValidation = [
  body("username").trim().notEmpty().withMessage("Please fill in a username."),
  body("password").trim().notEmpty().withMessage("Please fill in a password."),
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

const updateUserValidation = [
  body("username").trim().notEmpty().withMessage("Please choose a username."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom(async (value, { req }) => {
      if (req.body.oldEmail !== value) {
        const isExist = await getUserById(value);
        if (isExist.length > 0) {
          throw new Error("Email is already registered");
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

const roomsValidation = [
  body("room").trim().notEmpty().withMessage("Please provide a room."),
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

export {
  bookingValidation,
  registerValidation,
  signinValidation,
  updateUserValidation,
  roomsValidation,
};
