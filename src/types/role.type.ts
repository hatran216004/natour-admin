import { Permission } from './permission.type';

export type Role = {
  name: 'lead-guide' | 'admin' | 'guide' | 'user';
  description: string;
  _id: string;
  permissions: Permission[];
};
