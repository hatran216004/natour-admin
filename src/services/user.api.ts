import { AuthResponse } from '../types/auth.type';
import { Users, UsersListConfig } from '../types/user.type';
import http from '../utils/http';

export const userApi = {
  getMe: () => http.get<AuthResponse>('/users/me'),
  getAllUsers: (queryConfig: UsersListConfig) =>
    http.get<Users>('/users', { params: queryConfig })
};
