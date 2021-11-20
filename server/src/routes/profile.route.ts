import { Router } from "express";
import passport from "passport";
import { getProfile } from "../controllers/profile.controller";
import handlePassportError from "../middlewares/error.middleware";

const profileRouter = Router();

profileRouter.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getProfile,
  handlePassportError(401)
);

export default profileRouter;
