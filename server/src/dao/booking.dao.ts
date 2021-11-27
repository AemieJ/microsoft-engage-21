import { LectureDAO } from "./lecture.dao"
import { UserDAO } from "./user.dao"

export interface BookingDAO {
  id: number
  mode: string
  attended: boolean
  lecture: LectureDAO
  user: UserDAO
}
