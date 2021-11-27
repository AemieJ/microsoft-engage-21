import { RequestHandler, Request, Response, NextFunction } from "express"

const hasRole =
  (roleName: string): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const roles = await user.getRoles()
    const roleNames = roles.map((role) => role.name)

    if (roleNames.some((name) => name === roleName)) {
      return next()
    }
    return res.status(401).send({ err: "Unauthorized" })
  }

export default hasRole
