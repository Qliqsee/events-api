import { Request, Response } from "express";

export const current = (req: Request, res: Response) => {
  res.status(200).send({ currentUser: req.currentUser || null });
};
