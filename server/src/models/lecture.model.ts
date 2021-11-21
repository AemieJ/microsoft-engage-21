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
import { LectureDAO } from "../dao/lecture.dao";
import sequelize from "../db";
import Booking from "./booking.model";
import ClassRoom from "./classroom.model";

interface LectureAttributes {
  id: number;
  from: number;
  to: number;
}

type LectureCreationAttributes = Optional<LectureAttributes, "id">;

class Lecture
  extends Model<LectureAttributes, LectureCreationAttributes>
  implements LectureAttributes
{
  public id!: number;
  public from!: number;
  public to!: number;

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

  public async toDAO(): Promise<LectureDAO> {
    const classRoomCode = (await this.getClassRoom()).code;
    return {
      id: this.id,
      from: this.from,
      to: this.to,
      classRoomCode,
    };
  }
}

Lecture.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.BIGINT,
    },
    to: {
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize,
    modelName: "Lecture",
  }
);

export default Lecture;
