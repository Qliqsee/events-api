import express from "express";

import { currentUser } from "../../middlewares/currentUser";
import { signinValidator, signupValidator, validateRequest } from "../../middlewares/validator";
import { createEvent } from "./event-controllers/create";
import { deleteEvent } from "./event-controllers/delete";
import { event } from "./event-controllers/event";
import { events } from "./event-controllers/events";
import { updateEvent } from "./event-controllers/update";

const router = express.Router();

router.post("/create", currentUser, createEvent);
router.put("/update", currentUser, updateEvent);
router.get("/:eventId", event);
router.delete("/:eventId", signinValidator, validateRequest, deleteEvent);
router.delete("/", signinValidator, validateRequest, events);

export { router as userRouter };
