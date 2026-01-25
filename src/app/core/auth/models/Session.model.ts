import { UserRole } from './User.model';

export interface Session {
  userId: string;
  role: UserRole;
  name: string;
  token: string;
}
