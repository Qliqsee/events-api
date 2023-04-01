import { NextFunction, Request, Response } from "express";

import { NotAuthorizedError } from "../../../errors/not-authorized-error";
import { User } from "../../../models/user/user.model";

export const onboarding = async (req: Request, res: Response, next: NextFunction) => {
  const id = req?.currentUser?.id;

  const { dateOfBirth, locationLatitude, locationLongitude, tagName } = req.body;

  const existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    return next(new NotAuthorizedError());
  }

  const update = {
    dateOfBirth,
    locationLatitude,
    locationLongitude,
    tagName,
    onboardingComplete: true,
    verified: true,
  };
  const options = { new: true };

  const newUser = await User.findByIdAndUpdate(id, update, options).lean();

  const user = {
    ...newUser,
    id: newUser._id,
    password: undefined,
    __v: undefined,
    _id: undefined,
  };

  res.status(201).send(user);
};
