import { Request, Response, NextFunction, RequestHandler } from "express"
import { Schema } from "joi"

// Removes the backslash in JOI error messages
const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
}

const validate =
  (schema: Schema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, options)

    if (error) {
      return res.status(400).send({ err: error.details[0].message })
    }
    return next()
  }

export default validate
