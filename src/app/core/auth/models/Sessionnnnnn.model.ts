import { UserRole } from './Userrrrr.model';

export interface Session {
  userId: string;
  role: UserRole;
  name: string;
  token: string;
}
