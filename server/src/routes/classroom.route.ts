import { Router } from "express";
import Joi from "joi";
import passport from "passport";
import {
  createClassRoom,
  deleteClassRoom,
  getClassRoom,
  getClassRooms,
  joinClassRoom,
} from "../controllers/classroom.controller";
import hasRole from "../middlewares/role.middleware";
import validate from "../middlewares/validate.middleware";
import { RoleName } from "../models/role.model";

const classRoomRouter = Router();

export interface CreateClassRoomRequest {
  name: string;
  description: string;
  code: string;
}

export const createClassRoomSchema = Joi.object<CreateClassRoomRequest>({
  name: Joi.string().required(),
  description: Joi.string(), // TODO: Change 1 -> description of classroom optional
  code: Joi.string().required(),
});

classRoomRouter.post(
  "/join/:code",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  joinClassRoom
);

classRoomRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  deleteClassRoom
);

classRoomRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getClassRoom
);

// TODO: Change 2 -> get subject/classroom details by code

classRoomRouter.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getClassRooms
);

classRoomRouter.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  validate(createClassRoomSchema),
  createClassRoom
);

// TODO: Change 3 -> create class take input of meeting link as well (it's required)

export default classRoomRouter;
