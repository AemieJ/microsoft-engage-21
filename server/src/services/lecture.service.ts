import ClassRoom from "../models/classroom.model";
import Lecture from "../models/lecture.model";

export const createLecture = async (
  from: number,
  to: number,
  classRoom: ClassRoom
): Promise<Lecture> => {
  const lecture = await Lecture.create({ from, to });
  await lecture.setClassRoom(classRoom);
  return lecture;
};

export const getLecturesByClassRoom = async (
  classRoom: ClassRoom
): Promise<Lecture[]> => {
  return await classRoom.getLectures();
};

export const doesLectureExistsById = async (id: number): Promise<boolean> => {
  const lecture = await Lecture.findOne({ where: { id } });
  return !!lecture;
};

export const getLectureById = async (id: number): Promise<Lecture> => {
  const lecture = await Lecture.findOne({ where: { id } });
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  return lecture;
};
