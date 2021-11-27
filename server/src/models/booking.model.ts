import {
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize"
import { BookingDAO } from "../dao/booking.dao"
import sequelize from "../db"
import Lecture from "./lecture.model"
import User from "./user.model"

interface BookingAttributes {
  id: number
  mode: string
  attended: boolean
}

type BookingCreationAttributes = Optional<BookingAttributes, "id">

class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  public id!: number
  public mode!: string
  public attended!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getLecture!: HasOneGetAssociationMixin<Lecture>
  public setLecture!: HasOneSetAssociationMixin<Lecture, number>

  public getUser!: HasOneGetAssociationMixin<User>
  public setUser!: HasOneSetAssociationMixin<User, number>

  public readonly lecture?: Lecture
  public readonly user?: User

  public async toDAO(): Promise<BookingDAO> {
    const lecture = await this.getLecture()
    const user = await this.getUser()
    const lectureDAO = await lecture.toDAO()
    const userDAO = await user.toDAO()
    return {
      id: this.id,
      mode: this.mode,
      attended: this.attended,
      lecture: lectureDAO,
      user: userDAO,
    }
  }
}

Booking.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    mode: {
      type: DataTypes.STRING,
    },
    attended: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Booking",
  }
)

export default Booking
