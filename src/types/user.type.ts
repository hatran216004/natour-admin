import { SuccessResponseApi } from './utils.type';

export type User = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  active?: boolean;
  role?: {
    name: string;
    _id: string;
  };
};

export type UserResponse = SuccessResponseApi<{
  user: User;
}>;

export type Users = SuccessResponseApi<{
  users: User[];
}>;

export type UsersListConfig = {
  page?: number;
  limit?: number;
  sort?: 'name' | 'email';
  active?: boolean;
  role?: string;
};
