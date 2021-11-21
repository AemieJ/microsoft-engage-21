import { Router } from "express";
import Joi from "joi";
import passport from "passport";
import {
  classRoomByCode,
  createClassRoom,
  deleteClassRoom,
  getClassRoom,
  getClassRooms,
  joinClassRoom,
} from "../controllers/classroom.controller";
import handlePassportError from "../middlewares/error.middleware";
import hasRole from "../middlewares/role.middleware";
import validate from "../middlewares/validate.middleware";
import { RoleName } from "../models/role.model";

const classRoomRouter = Router();

export interface CreateClassRoomRequest {
  name: string;
  description: string;
  code: string;
  link: string;
}

export const createClassRoomSchema = Joi.object<CreateClassRoomRequest>({
  name: Joi.string().required(),
  description: Joi.string(),
  code: Joi.string().required(),
  link: Joi.string().required(),
});

classRoomRouter.post(
  "/join/:code",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  joinClassRoom,
  handlePassportError(401)
);

classRoomRouter.get(
  "/code/:code",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  classRoomByCode,
  handlePassportError(401)
);

classRoomRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  deleteClassRoom,
  handlePassportError(401)
);

classRoomRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getClassRoom,
  handlePassportError(401)
);

classRoomRouter.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getClassRooms,
  handlePassportError(401)
);

classRoomRouter.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  validate(createClassRoomSchema),
  createClassRoom,
  handlePassportError(401)
);

export default classRoomRouter;
