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
import sequelize from "../db";
import User from "./user.model";

export enum RoleName {
  STUDENT = "STUDENT",
  FACULTY = "FACULTY",
}

interface RoleAttributes {
  id: number;
  name: string;
  description: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, "id">;

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public hasUser!: HasManyHasAssociationMixin<User, number>;
  public countUsers!: HasManyCountAssociationsMixin;
  public removeUser!: HasManyRemoveAssociationMixin<User, number>;

  public readonly user?: User[];
}

Role.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Role",
  }
);

export default Role;
