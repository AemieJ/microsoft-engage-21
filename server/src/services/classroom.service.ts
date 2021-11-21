import ClassRoom from "../models/classroom.model";
import User from "../models/user.model";

export const doesClassRoomExistByCode = async (
  code: string
): Promise<boolean> => {
  const classroom = await ClassRoom.findOne({ where: { code } });
  if (classroom) return true;
  return false;
};

export const makeClassRoom = async (
  name: string,
  description: string,
  code: string,
  link: string
): Promise<ClassRoom> => {
  // Assumes code does not exist
  const classroom = await ClassRoom.create({
    name,
    description,
    code,
    link,
  });
  return classroom;
};

export const doesClassRoomExistsById = async (id: string): Promise<boolean> => {
  const classroom = await ClassRoom.findOne({ where: { id } });
  if (classroom) return true;
  return false;
};

export const deleteClassRoomById = async (id: number): Promise<void> => {
  const classroom = await ClassRoom.findOne({ where: { id } });
  if (!classroom) return;
  await classroom.destroy();
};

export const addUserToClassRoomIfNotExists = async (
  classroom: ClassRoom,
  user: User
): Promise<void> => {
  const users = await classroom.getUsers();
  if (users.find((u) => u.id === user.id)) return;
  await classroom.addUser(user);
};

export const getClassRoomById = async (id: number): Promise<ClassRoom> => {
  const classroom = await ClassRoom.findOne({ where: { id } });
  if (!classroom) throw "Classroom not found";
  return classroom;
};

export const getClassRoomByCode = async (code: string): Promise<ClassRoom> => {
  const classroom = await ClassRoom.findOne({ where: { code } });
  if (!classroom) throw "Classroom not found";
  return classroom;
};

export const getClassRoomsOfUser = async (
  userId: number
): Promise<ClassRoom[]> => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw "User not found";
  const classrooms = await user.getClassRooms();
  return classrooms;
};
