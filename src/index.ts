import mongoose from "mongoose";

import app from "./app";
import { config } from "./config/variables.config";
import Logger from "./utils/colors";

const port = config.server.port;
const start = async () => {
  if (!config.jwt.secret) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(config.mongo.url);
    Logger.info("Connected to MongoDb");
  } catch (err) {
    Logger.error(err);
  }

  app.listen(port, () => {
    Logger.info(`Listening on port ${port}!!!!!!!!`);
  });
};

start();
