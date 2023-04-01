import express, { Request, Response } from "express";

const router = express.Router();

export const createEvent = async (req: Request, res: Response) => {
  res.send("createEvent");
};
