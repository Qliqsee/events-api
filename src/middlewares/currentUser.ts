import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config/variables.config";
import { UserDoc } from "../models/user/user.types";
import Logger from "../utils/colors";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDoc;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.jwt.secret!) as UserDoc;
    req.currentUser = payload;
  } catch (err) {
    Logger.error(err);
  }

  next();
};
