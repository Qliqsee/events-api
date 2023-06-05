import { Request, Response } from "express";

export const signout = (req: Request, res: Response) => {
  res.set("Authorization", "").send({});
};
