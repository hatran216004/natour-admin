import { Role } from './role.type';
import { User } from './user.type';
import { SuccessResponseApi } from './utils.type';

export type AuthResponse = SuccessResponseApi<{
  user: User;
}>;

export type RolesResponse = SuccessResponseApi<{
  roles: Role[];
}>;
