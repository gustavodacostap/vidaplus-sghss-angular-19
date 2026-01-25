export type UserRole = 'ADMIN' | 'PROFESSIONAL' | 'PATIENT';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  name: string;
}
