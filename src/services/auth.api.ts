import { AuthResponse } from '../types/auth.type';
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
  logout: () => http.post<AuthResponse>('/users/logout')
};
