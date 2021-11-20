import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import sequelize from "../db";
import Booking from "./booking.model";
import ClassRoom from "./classroom.model";

interface LectureAttributes {
  id: number;
  from: Date;
  to: Date;
}

type LectureCreationAttributes = Optional<LectureAttributes, "id">;

class Lecture
  extends Model<LectureAttributes, LectureCreationAttributes>
  implements LectureAttributes
{
  public id!: number;
  public from!: Date;
  public to!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getClassRoom!: HasOneGetAssociationMixin<ClassRoom>;
  public setClassRoom!: HasOneSetAssociationMixin<ClassRoom, number>;

  public getLectures!: HasManyGetAssociationsMixin<Lecture>;
  public addLecture!: HasManyAddAssociationMixin<Lecture, number>;
  public countLectures!: HasManyCountAssociationsMixin;
  public removeLecture!: HasManyRemoveAssociationMixin<Lecture, number>;

  public readonly classroom?: ClassRoom;
  public readonly bookings?: Booking[];
}

Lecture.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.DATE,
    },
    to: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Lecture",
  }
);

export default Lecture;
