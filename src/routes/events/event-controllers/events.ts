import express, { Request, Response } from "express";

const router = express.Router();

export const events = async (req: Request, res: Response) => {
  res.send("events");
};
