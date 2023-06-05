import { Request, Response } from "express";

export const current = (req: Request, res: Response) => {
  const currentUser = {
    ...req.currentUser,
    iat: undefined,
  };
  res.status(200).send({ currentUser: currentUser || null });
};
