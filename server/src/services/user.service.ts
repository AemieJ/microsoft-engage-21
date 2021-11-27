import ClassRoom from "../models/classroom.model"
import Role, { RoleName } from "../models/role.model"
import User from "../models/user.model"
import { getRoleByNameOrCreate } from "./role.service"

export const doesUserExistByEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ where: { email } })
  if (user) return true
  return false
}

export const createStudent = async (
  email: string,
  name: string,
  password: string | null,
  auth_provider: string
): Promise<User> => {
  // Assumes that user with email does not exist
  const student = await getRoleByNameOrCreate(RoleName.STUDENT)

  const user = await User.create({
    name,
    auth_provider,
    email,
    password,
    remote_code: null,
    seat: null,
  })
  await user.addRole(student)
  return user
}

export const createFaculty = async (
  email: string,
  name: string,
  password: string | null,
  auth_provider: string
): Promise<User> => {
  // Assumes that user with email does not exist
  const faculty = await getRoleByNameOrCreate(RoleName.FACULTY)

  const user = await User.create({
    name,
    auth_provider,
    email,
    password,
    remote_code: null,
    seat: null,
  })
  await user.addRole(faculty)
  return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await User.findOne({ where: { email }, include: [Role] })
  if (user) return user
  throw `Error: User with email ${email} does not exist`
}

export const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll()
}

export const clearUserCodes = async (user: User): Promise<User> => {
  user.remote_code = null
  user.seat = null
  return await user.save()
}

export const setUserRemoteCode = async (
  user: User,
  remote_code: string
): Promise<User> => {
  user.remote_code = remote_code
  return await user.save()
}

export const getAllSeats = async (): Promise<Set<number>> => {
  const users = await getAllUsers()
  const seats: Set<number> = new Set()

  for (const user of users) {
    if (user.seat) {
      seats.add(user.seat)
    }
  }
  return seats
}

// Seats from 1 to 18
// returns -1 if no seat is available
// returns positive number if seat is available
export const getAvailableSeat = async (): Promise<number> => {
  const seats = await getAllSeats()
  for (let i = 1; i <= 18; i++) {
    if (!seats.has(i)) return i
  }
  return -1
}

export const setUserSeat = async (user: User, seat: number): Promise<User> => {
  user.seat = seat
  return await user.save()
}

export const getClassRoomsOfFacultyUser = async (
  user: User
): Promise<ClassRoom[]> => {
  return await user.getClassRooms()
}
