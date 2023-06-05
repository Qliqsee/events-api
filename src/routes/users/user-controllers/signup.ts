import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../../../errors/bad-request-error";
import { User } from "../../../models/user/user.model";
import { config } from "../../../config/variables.config";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new BadRequestError("Email in use"));
  }

  const newUser = User.newUser({ email, password, firstName, lastName });
  await newUser.save();

  const user = newUser.toObject({
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    },
  });

  const token = jwt.sign(user, config.jwt.secret, { expiresIn: "1h" });

  res.set("Authorization", `Bearer ${token}`).status(201).send(user);
};
