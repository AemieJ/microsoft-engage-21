import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import { ClassRoomDAO } from "../dao/classroom.dao";
import sequelize from "../db";
import Booking from "./booking.model";
import Lecture from "./lecture.model";
import User from "./user.model";

interface ClassRoomAttributes {
  id: number;
  name: string;
  description: string | null;
  code: string;
  link: string;
}

type ClassRoomCreationAttributes = Optional<ClassRoomAttributes, "id">;

class ClassRoom
  extends Model<ClassRoomAttributes, ClassRoomCreationAttributes>
  implements ClassRoomAttributes
{
  public id!: number;
  public name!: string;
  public description!: string | null;
  public code!: string;
  public link!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public hasUser!: HasManyHasAssociationMixin<User, number>;
  public countUsers!: HasManyCountAssociationsMixin;
  public removeUser!: HasManyRemoveAssociationMixin<User, number>;

  public getLectures!: HasManyGetAssociationsMixin<Lecture>;
  public addLecture!: HasManyAddAssociationMixin<Lecture, number>;
  public hasLecture!: HasManyHasAssociationMixin<Lecture, number>;
  public countLectures!: HasManyCountAssociationsMixin;
  public removeLecture!: HasManyRemoveAssociationMixin<Lecture, number>;

  public readonly users?: User[];
  public readonly lectures?: Lecture[];

  public async toDAO(): Promise<ClassRoomDAO> {
    const users = (await this.getUsers()).map((user) => user.email);
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      code: this.code,
      link: this.link,
      users,
    };
  }
}

ClassRoom.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    link: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "ClassRoom",
  }
);

ClassRoom.hasMany(Lecture);
Lecture.belongsTo(ClassRoom);

Lecture.hasMany(Booking);
Booking.belongsTo(Lecture);

export default ClassRoom;
