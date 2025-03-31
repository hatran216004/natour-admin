import { Permission } from './permission.type';

export type Role = {
  name: string;
  description: string;
  _id: string;
  permisions: Permission[];
};
