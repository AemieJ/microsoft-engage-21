export interface UserDAO {
  id: number
  name: string
  email: string
  auth_provider: string
  roles: string[]
  seat: number | null
  remote_code: string | null
}
