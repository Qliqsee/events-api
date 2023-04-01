import express from "express";

import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/require-auth";
import { onboardingValidator, signinValidator, signupValidator, validateRequest } from "../../middlewares/validator";

import { current } from "./user-controllers/current-user";
import { onboarding } from "./user-controllers/onboarding";
import { signin } from "./user-controllers/signin";
import { signout } from "./user-controllers/signout";
import { signup } from "./user-controllers/signup";

const router = express.Router();

router.post("/sign-up", signupValidator, validateRequest, signup);
router.post("/sign-in", signinValidator, validateRequest, signin);
router.post("/sign-out", signout);
router.get("/current", currentUser, requireAuth, current);
router.post("/onboarding", currentUser, requireAuth, onboardingValidator, validateRequest, onboarding);

export { router as userRouter };
