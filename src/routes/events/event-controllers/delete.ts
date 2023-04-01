import express, { Request, Response } from "express";

const router = express.Router();

export const deleteEvent = async (req: Request, res: Response) => {
  res.send("deleteEvent");
};
