import { Op } from "sequelize";
import Booking from "../models/booking.model";
import ClassRoom from "../models/classroom.model";
import Lecture from "../models/lecture.model";
import User from "../models/user.model";

export const createBooking = async (
  mode: string,
  user: User,
  lecture: Lecture
): Promise<Booking> => {
  // does booking already exists for this user
  let booking = await Booking.findOne({
    include: [
      {
        model: Lecture,
        where: { id: lecture.id },
      },
      {
        model: User,
        where: { id: user.id },
      },
    ],
  });

  if (booking) {
    return booking;
  }

  booking = await Booking.create({ mode, attended: false });
  await booking.setUser(user);
  await booking.setLecture(lecture);
  return booking;
};

export const attendBooking = async (booking: Booking): Promise<Booking> => {
  await booking.update({ attended: true });
  return booking;
};

export const getBookingsByUser = async (user: User): Promise<Booking[]> => {
  return await user.getBookings();
};

export const getBookingsByLecture = async (
  lecture: Lecture
): Promise<Booking[]> => {
  return await lecture.getBookings();
};

export const getAllPreferences = async (
  from: number,
  to: number,
  classRoomCode: string
): Promise<Booking[]> => {
  const lectures = await Lecture.findAll({
    where: {
      from: {
        [Op.gte]: from,
      },
      to: {
        [Op.lte]: to,
      },
    },
    include: [
      {
        model: ClassRoom,
        where: { code: classRoomCode },
      },
      {
        model: Booking,
      },
    ],
  });

  const bookings = [];
  for (const lecture of lectures) {
    const lBookings = await lecture.getBookings();
    bookings.push(...lBookings);
  }

  return bookings;
};
