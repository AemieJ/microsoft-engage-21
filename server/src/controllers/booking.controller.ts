import { RequestHandler, Request, Response } from "express";
import {
  BookingPreferenceRequest,
  BookLectureRequest,
} from "../routes/booking.route";
import { createBooking, getAllPreferences } from "../services/booking.service";
import {
  doesLectureExistsById,
  getLectureById,
} from "../services/lecture.service";

export const bookLecture: RequestHandler = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    BookLectureRequest
  >,
  res: Response
) => {
  const { lectureId, mode } = req.body;

  const lectureExists = await doesLectureExistsById(lectureId);
  if (!lectureExists) {
    res.status(404).send({
      err: "Lecture not found",
    });
    return;
  }

  const lecture = await getLectureById(lectureId);
  const user = req.user;

  const booking = await createBooking(mode, user, lecture);
  res.status(200).send({ ...(await booking.toDAO()) });
};

export const getPreferences: RequestHandler = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    BookingPreferenceRequest
  >,
  res: Response
) => {
  const { from, subjectCode, to } = req.body;
  const bookings = await getAllPreferences(+from, +to, subjectCode);

  return res
    .status(200)
    .send(
      await Promise.all(bookings.map(async (booking) => await booking.toDAO()))
    );
};
