import { RequestHandler, Request, Response } from "express"
import { SetRemoteCodeRequest } from "../routes/profile.route"
import {
  clearUserCodes,
  getAvailableSeat,
  setUserRemoteCode,
  setUserSeat,
} from "../services/user.service"

export const getProfile: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.send({ ...(await req.user.toDAO()) })
}

export const clearCode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let user = req.user
  user = await clearUserCodes(user)
  res.send({ ...(await user.toDAO()) })
}

export const setRemoteCode: RequestHandler = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    SetRemoteCodeRequest
  >,
  res: Response
) => {
  let user = req.user
  user = await setUserRemoteCode(user, req.body.code)
  res.send({ ...(await user.toDAO()) })
}

export const bookSeat: RequestHandler = async (req: Request, res: Response) => {
  const user = req.user
  const nextSeat = await getAvailableSeat()
  if (nextSeat === -1) {
    res.send({ err: "No seats available" })
    return
  }
  await setUserSeat(user, nextSeat)
  res.send({ seat: nextSeat })
}
