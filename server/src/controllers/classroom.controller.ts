import { RequestHandler, Request, Response } from "express";
import { CreateClassRoomRequest } from "../routes/classroom.route";
import {
  addUserToClassRoomIfNotExists,
  deleteClassRoomById,
  doesClassRoomExistByCode,
  doesClassRoomExistsById,
  getClassRoomByCode,
  getClassRoomById,
  getClassRoomsOfUser,
  makeClassRoom,
} from "../services/classroom.service";

export const createClassRoom: RequestHandler = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateClassRoomRequest
  >,
  res: Response
) => {
  const { name, description, code, link } = req.body;

  const doesClassRoomExists = await doesClassRoomExistByCode(code);

  if (doesClassRoomExists) {
    return res.status(400).send({ err: "Classroom already exists" });
  }

  const classroom = await makeClassRoom(name, description, code, link);

  return res.status(201).send({ ...(await classroom.toDAO()) });
};

export const getClassRooms: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const classRooms = await getClassRoomsOfUser(userId);
  return res
    .status(200)
    .send(
      await Promise.all(
        classRooms.map(async (classRoom) => await classRoom.toDAO())
      )
    );
};

export const deleteClassRoom: RequestHandler<{ id: string }> = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const classRoomExists = await doesClassRoomExistsById(id);

  if (!classRoomExists) {
    return res.status(404).send({ err: "Classroom not found" });
  }

  await deleteClassRoomById(+id);

  return res.status(204).send();
};

export const joinClassRoom: RequestHandler<{ code: string }> = async (
  req: Request<{ code: string }>,
  res: Response
) => {
  const { code } = req.params;

  try {
    const classroom = await getClassRoomByCode(code);
    await addUserToClassRoomIfNotExists(classroom, req.user);
    return res.status(200).send(await classroom.toDAO());
  } catch (err) {
    return res.status(404).send({ err: "Classroom not found" });
  }
};

export const getClassRoom: RequestHandler<{ id: string }> = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const classRoomExists = await doesClassRoomExistsById(id);

  if (!classRoomExists) {
    return res.status(404).send({ err: "Classroom not found" });
  }

  const classroom = await getClassRoomById(+id);

  return res.status(200).send({ ...(await classroom.toDAO()) });
};

export const classRoomByCode: RequestHandler<{ code: string }> = async (
  req: Request<{ code: string }>,
  res: Response
) => {
  const { code } = req.params;
  const classRoomExists = await doesClassRoomExistByCode(code);

  if (!classRoomExists) {
    return res.status(404).send({ err: "Classroom not found" });
  }

  const classroom = await getClassRoomByCode(code);

  return res.status(200).send({ ...(await classroom.toDAO()) });
};
