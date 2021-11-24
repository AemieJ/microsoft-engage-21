import { Router } from "express";
import Joi from "joi";
import passport from "passport";
import { bookLecture, getPreferences } from "../controllers/booking.controller";
import handlePassportError from "../middlewares/error.middleware";
import hasRole from "../middlewares/role.middleware";
import validate from "../middlewares/validate.middleware";
import { RoleName } from "../models/role.model";

const bookingRouter = Router();

export interface BookLectureRequest {
  lectureId: number;
  mode: string;
}

export const bookLectureSchema = Joi.object<BookLectureRequest>({
  lectureId: Joi.number().required(),
  mode: Joi.string().required(),
});

export interface BookingPreferenceRequest {
  subjectCode: string;
  from: string;
  to: string;
}

export const bookingPreferenceSchema = Joi.object<BookingPreferenceRequest>({
  subjectCode: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
});

bookingRouter.post(
  "/book",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  validate(bookLectureSchema),
  bookLecture,
  handlePassportError(401)
);

bookingRouter.post(
  "/preferences",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  validate(bookingPreferenceSchema),
  getPreferences,
  handlePassportError(401)
);

export default bookingRouter;
