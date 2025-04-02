import { Role } from './role.type';
import { User } from './user.type';
import { AuthSuccessResponseApi } from './utils.type';

export type AuthResponse = AuthSuccessResponseApi<{
  user: User;
}>;

export type RolesResponse = AuthSuccessResponseApi<{
  roles: Role[];
  pagination: {
    total: number;
    totalPages: number;
  };
}>;
