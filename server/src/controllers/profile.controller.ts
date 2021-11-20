import { RequestHandler, Request, Response } from "express";

export const getProfile: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.send({ ...(await req.user.toDAO()) });
};
