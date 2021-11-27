import Role from "../models/role.model"
import { toTitleCase } from "../util/string.util"

export const getRoleByNameOrCreate = async (
  roleName: string
): Promise<Role> => {
  const role = await Role.findOne({ where: { name: roleName } })
  if (role) return role
  // create role if not exists
  return await Role.create({
    name: roleName,
    description: toTitleCase(roleName),
  })
}
