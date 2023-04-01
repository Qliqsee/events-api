import express, { Request, Response } from "express";

const router = express.Router();

export const event = async (req: Request, res: Response) => {
  res.send("event");
};
