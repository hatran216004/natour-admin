export type User = {
  name: string;
  email: string;
  photo?: string;
  active?: boolean;
  role?: {
    name: string;
    _id: string;
  };
};
