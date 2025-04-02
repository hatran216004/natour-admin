import { User, UsersList, UsersListConfig } from '../types/user.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

type BodyConfig = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
  role: string;
};

export const userApi = {
  getMe: () => http.get<SuccessResponseApi<{ user: User }>>('/users/me'),
  getAllUsers: (params: UsersListConfig) =>
    http.get<SuccessResponseApi<UsersList>>('/users', { params }),
  deleteUser: (id: string) => http.delete(`/users/${id}`),
  createNewUser: (body: BodyConfig) =>
    http.post<SuccessResponseApi<{ user: User }>>('/users', body),
  updateUser: ({
    userId,
    body
  }: {
    userId: string;
    body: { email: string; name: string; role: string };
  }) => {
    return http.patch<SuccessResponseApi<{ user: User }>>(
      `/users/${userId}`,
      body
    );
  }
};
