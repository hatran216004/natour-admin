import { AuthResponse, RolesResponse } from '../types/auth.type';
import http from '../utils/http';

export const authApi = {
  signup: (body: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    return http.post<AuthResponse>('/users/signup', body);
  },
  login: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/users/login', body);
  },
  logout: () => http.post<AuthResponse>('/users/logout'),
  getAllRoles: () => http.get<RolesResponse>('/roles'),
  forgotPassowrd: (email: string) =>
    http.post('/users/forgot-password', { email }),
  resetPassword: ({
    token,
    password,
    passwordConfirm
  }: {
    token: string;
    password: string;
    passwordConfirm: string;
  }) =>
    http.patch(`/users/reset-password/${token}`, { password, passwordConfirm }),
  updatePassword: (body: {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }) => http.patch('/users/update-my-password', body)
};
