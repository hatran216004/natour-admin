import { AuthResponse } from '../types/auth.type';
import { UserResponse, Users, UsersListConfig } from '../types/user.type';
import http from '../utils/http';

export const userApi = {
  getMe: () => http.get<AuthResponse>('/users/me'),
  getAllUsers: (queryConfig: UsersListConfig) =>
    http.get<Users>('/users', { params: queryConfig }),
  deleteUser: (id: string) => http.delete(`/users/${id}`),
  createNewUser: (body: {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string;
  }) => http.post<UserResponse>('/users', body)
};
