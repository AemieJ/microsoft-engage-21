import Role, { RoleName } from "../models/role.model";
import User from "../models/user.model";
import { getRoleByNameOrCreate } from "./role.service";

export const doesUserExistByEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ where: { email } });
  if (user) return true;
  return false;
};

export const createStudent = async (
  email: string,
  name: string,
  password: string | null,
  auth_provider: string
): Promise<User> => {
  // Assumes that user with email does not exist
  const student = await getRoleByNameOrCreate(RoleName.STUDENT);

  const user = await User.create({
    name,
    auth_provider,
    email,
    password,
  });
  await user.addRole(student);
  return user;
};

export const createFaculty = async (
  email: string,
  name: string,
  password: string | null,
  auth_provider: string
): Promise<User> => {
  // Assumes that user with email does not exist
  const faculty = await getRoleByNameOrCreate(RoleName.FACULTY);

  const user = await User.create({
    name,
    auth_provider,
    email,
    password,
  });
  await user.addRole(faculty);
  return user;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await User.findOne({ where: { email }, include: [Role] });
  if (user) return user;
  throw `Error: User with email ${email} does not exist`;
};

export const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll();
};
