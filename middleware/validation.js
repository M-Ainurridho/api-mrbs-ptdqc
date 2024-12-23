import { body, validationResult } from "express-validator";
import { getUserById } from "../models/users.js";
import jwt from "jsonwebtoken";

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
    .withMessage("Invalid email")
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
  body("username").trim().notEmpty().withMessage("Required"),
  body("password").trim().notEmpty().withMessage("Required"),
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
  body("username").trim().notEmpty().withMessage("Required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Required")
    .isEmail()
    .withMessage("Invalid email"),
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

const tokenValidation = (req, res, next) => {
  const { token } = req.body;

  jwt.verify(token, "ptdqcpassword", function (err, decoded) {
    if (err) {
      res.status(404).json({
        ok: false,
        msg: "Not Found (token)",
      });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

const roomsValidation = [
  body("room").trim().notEmpty().withMessage("Required"),
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
  tokenValidation,
  roomsValidation,
};
