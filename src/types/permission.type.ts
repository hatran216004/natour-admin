export type Permission = {
  name: string;
  _id: string;
  description: string;
};

export type PermissionList = {
  permissions: Permission[];
  pagination: {
    total: number;
    totalPages: number;
  };
};

export type PermissionListConfig = {
  page?: number;
  limit?: number;
};
