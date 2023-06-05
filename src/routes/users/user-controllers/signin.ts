import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../../../errors/bad-request-error";
import { User } from "../../../models/user/user.model";
import { Password } from "../../../services/password";
import { config } from "../../../config/variables.config";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).lean();
  if (!existingUser) {
    return next(new BadRequestError("Invalid credentials"));
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);
  if (!passwordsMatch) {
    return next(new BadRequestError("Invalid credentials"));
  }

  const user = {
    ...existingUser,
    id: existingUser._id,
    _id: undefined,
    password: undefined,
    __v: undefined,
  };

  const token = jwt.sign(user, config.jwt.secret!, { expiresIn: "1h" });
  res.set("Authorization", `Bearer ${token}`).status(200).send(user);
};
