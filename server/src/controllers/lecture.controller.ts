import { RequestHandler, Request, Response } from "express";
import { CreateLectureRequest } from "../routes/lecture.route";
import {
  doesClassRoomExistByCode,
  getClassRoomByCode,
} from "../services/classroom.service";
import {
  createLecture,
  getLecturesByClassRoom,
} from "../services/lecture.service";

export const makeLecture: RequestHandler = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateLectureRequest
  >,
  res: Response
) => {
  const { from, to, classRoomCode } = req.body;

  const exists = await doesClassRoomExistByCode(classRoomCode);
  if (!exists) {
    res.status(404).send("Classroom does not exist");
    return;
  }

  const classRoom = await getClassRoomByCode(classRoomCode);
  const lecture = await createLecture(from, to, classRoom);
  return res.status(201).send({ ...(await lecture.toDAO()) });
};

export const getLectures: RequestHandler<{ code: string }> = async (
  req: Request<{ code: string }>,
  res: Response
) => {
  const { code } = req.params;
  const exists = await doesClassRoomExistByCode(code);
  if (!exists) {
    res.status(404).send("Classroom does not exist");
    return;
  }

  const classRoom = await getClassRoomByCode(code);
  const lectures = await getLecturesByClassRoom(classRoom);
  return res
    .status(200)
    .send(await Promise.all(lectures.map(async (l) => await l.toDAO())));
};
