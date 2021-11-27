import { Router } from "express"
import Joi from "joi"
import { login, signup } from "../controllers/auth.controller"
import validate from "../middlewares/validate.middleware"

const authRouter = Router()

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  is_faculty: boolean
}

export const loginSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required().label("password"),
})

export const signupSchema = Joi.object<SignupRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required(),
  name: Joi.string().required(),
  is_faculty: Joi.boolean().required(),
})

authRouter.post("/login", validate(loginSchema), login)

authRouter.post("/signup", validate(signupSchema), signup)

export default authRouter
