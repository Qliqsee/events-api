import express, { Request, Response } from "express";

const router = express.Router();

export const updateEvent = async (req: Request, res: Response) => {
  res.send("updateEvent");
};
