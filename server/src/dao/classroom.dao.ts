export interface ClassRoomDAO {
  id: number;
  name: string;
  description: string | null;
  code: string;
  link: string;
  users: string[];
}
