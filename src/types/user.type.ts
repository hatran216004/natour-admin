export type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  active?: boolean;
  role?: {
    name: string;
    _id: string;
  };
};
