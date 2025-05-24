export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  active?: boolean;
  role?: {
    name: string;
    _id: string;
  };
};

export type UsersList = {
  users: User[];
  pagination: {
    total: number;
    totalPages: number;
  };
};

export type UsersListConfig = {
  page?: number;
  limit?: number;
  sort?: 'name' | 'email';
  active?: boolean;
  role?: string;
};
