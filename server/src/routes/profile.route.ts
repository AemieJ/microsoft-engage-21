import { Router } from "express";
import Joi from "joi";
import passport from "passport";
import {
  bookSeat,
  clearCode,
  getProfile,
  setRemoteCode,
} from "../controllers/profile.controller";
import handlePassportError from "../middlewares/error.middleware";
import validate from "../middlewares/validate.middleware";

const profileRouter = Router();

export interface SetRemoteCodeRequest {
  code: string;
}

export const setRemoteCodeSchema = Joi.object<SetRemoteCodeRequest>({
  code: Joi.string().required(),
});

profileRouter.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getProfile,
  handlePassportError(401)
);

profileRouter.post(
  "/remote-code",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validate(setRemoteCodeSchema),
  setRemoteCode,
  handlePassportError(401)
);

profileRouter.post(
  "/book-seat",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  bookSeat,
  handlePassportError(401)
);

profileRouter.post(
  "/clear",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  clearCode,
  handlePassportError(401)
);

export default profileRouter;
