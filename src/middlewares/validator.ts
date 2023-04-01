import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const signupValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("first name must be between 2 and 30 characters")
    .isAlpha()
    .withMessage("Enter a valid first name"),
  body("lastName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("last name must be between 2 and 30 characters")
    .isAlpha()
    .withMessage("Enter a valid last name"),
];

export const signinValidator = [
  body("email").isEmail().withMessage("Invalid valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export const onboardingValidator = [
  body("dateOfBirth")
    .trim()
    .notEmpty()
    .withMessage("Date is required valid")
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Invalid date format (should be DD-MM-YYYY)"),
  body("locationLatitude").isFloat().withMessage("Invalid latitude"),
  body("locationLongitude").isDecimal().withMessage("Invalid latitude"),
  body("tagName").trim().isLength({ min: 2, max: 30 }).withMessage("tag must be between 2 and 30 character"),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }

  next();
};
