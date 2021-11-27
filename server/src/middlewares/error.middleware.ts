import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

const handlePassportError =
  (errorCode: number): ErrorRequestHandler =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err, _req: Request, res: Response, _next: NextFunction) => {
    res.status(errorCode).send({ err: err.message })
  }

export default handlePassportError
