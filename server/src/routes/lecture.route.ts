import { Router } from "express"
import Joi from "joi"
import passport from "passport"
import { getLectures, makeLecture } from "../controllers/lecture.controller"
import handlePassportError from "../middlewares/error.middleware"
import hasRole from "../middlewares/role.middleware"
import validate from "../middlewares/validate.middleware"
import { RoleName } from "../models/role.model"

const lectureRouter = Router()

export interface CreateLectureRequest {
  from: number
  to: number
  classRoomCode: string
}

export const createLectureSchema = Joi.object<CreateLectureRequest>({
  from: Joi.number().required(),
  to: Joi.number().required(),
  classRoomCode: Joi.string().required(),
})

lectureRouter.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  hasRole(RoleName.FACULTY),
  validate(createLectureSchema),
  makeLecture,
  handlePassportError(401)
)

lectureRouter.get(
  "/:code",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  getLectures,
  handlePassportError(401)
)

export default lectureRouter
