import { AuthResponse } from '../types/auth.type';
import http from '../utils/http';

export const userApi = {
  getMe: () => http.get<AuthResponse>('/users/me')
};
