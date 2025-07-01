import {
  Permission,
  PermissionList,
  PermissionListConfig
} from '../types/permission.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';
import { Role } from '../types/role.type';
import { PermissionSchema, RoleSchema } from '../utils/rules';
import { Omit } from 'lodash';

export const rolePermissionApi = {
  getAllPermissions: (queryConfig: PermissionListConfig) =>
    http.get<SuccessResponseApi<PermissionList>>('/permissions', {
      params: queryConfig
    }),
  getAllForRole: () =>
    http.get<SuccessResponseApi<Omit<PermissionList, 'pagination'>>>(
      '/permissions/all'
    ),
  createNewPermission: (body: PermissionSchema) =>
    http.post('/permissions', body),
  createNewRole: (body: RoleSchema) =>
    http.post<SuccessResponseApi<Role>>('/roles', body),
  updateRole: ({ id, body }: { id: string; body: RoleSchema }) =>
    http.patch<SuccessResponseApi<Role>>(`/roles/${id}`, body),
  updatePermision: ({ id, body }: { id: string; body: PermissionSchema }) =>
    http.patch<SuccessResponseApi<Permission>>(`/permissions/${id}`, body),
  deleteRole: (id: string) => http.delete(`/roles/${id}`),
  deletePermission: (id: string) => http.delete(`/permissions/${id}`)
};
