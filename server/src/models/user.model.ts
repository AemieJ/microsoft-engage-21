import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from "sequelize"
import { UserDAO } from "../dao/user.dao"
import sequelize from "../db"
import Booking from "./booking.model"
import ClassRoom from "./classroom.model"
import Role from "./role.model"

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string | null
  auth_provider: string
  seat: number | null
  remote_code: string | null
}

type UserCreationAttributes = Optional<UserAttributes, "id">

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public email!: string
  public name!: string
  public auth_provider!: string
  public password!: string | null
  public seat!: number | null
  public remote_code!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getRoles!: HasManyGetAssociationsMixin<Role>
  public addRole!: HasManyAddAssociationMixin<Role, number>
  public hasRole!: HasManyHasAssociationMixin<Role, number>
  public countRoles!: HasManyCountAssociationsMixin
  public removeRole!: HasManyRemoveAssociationMixin<Role, number>

  public getClassRooms!: HasManyGetAssociationsMixin<ClassRoom>
  public addClassRoom!: HasManyAddAssociationMixin<ClassRoom, number>
  public hasClassRoom!: HasManyHasAssociationMixin<ClassRoom, number>
  public countClassRooms!: HasManyCountAssociationsMixin
  public removeClassRoom!: HasManyRemoveAssociationMixin<ClassRoom, number>

  public getBookings!: HasManyGetAssociationsMixin<Booking>
  public addBooking!: HasManyAddAssociationMixin<Booking, number>
  public hasBooking!: HasManyHasAssociationMixin<Booking, number>
  public countBookings!: HasManyCountAssociationsMixin
  public removeBooking!: HasManyRemoveAssociationMixin<Booking, number>

  public readonly roles?: Role[]
  public readonly classrooms?: ClassRoom[]
  public readonly bookings?: Booking[]

  public async toDAO(): Promise<UserDAO> {
    const roles = (await this.getRoles()).map((role) => role.name)
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      auth_provider: this.auth_provider,
      roles,
      seat: this.seat,
      remote_code: this.remote_code,
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    auth_provider: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    remote_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
)

User.belongsToMany(Role, { through: "UserRole" })
Role.belongsToMany(User, { through: "UserRole" })

ClassRoom.belongsToMany(User, { through: "UserClassRoom" })
User.belongsToMany(ClassRoom, { through: "UserClassRoom" })

User.hasMany(Booking)
Booking.belongsTo(User)

export default User
