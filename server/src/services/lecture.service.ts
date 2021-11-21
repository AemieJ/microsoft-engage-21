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
