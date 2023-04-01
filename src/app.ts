import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import Logger from "./utils/colors";
import { userRouter } from "./routes/users/users.routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);

// log requests
app.use((req, res, next) => {
  // log request
  Logger.info(`Incoming method -> Method:[${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  // log response
  res.on("finish", () => {
    Logger.info(
      `Outgoing method -> Method:[${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/events", userRouter);
app.use("/api/event-rooms", userRouter);

//  Not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export default app;
