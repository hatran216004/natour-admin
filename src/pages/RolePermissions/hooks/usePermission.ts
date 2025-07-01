import { useQuery, useQueryClient } from '@tanstack/react-query';
import useUrl from '../../../hooks/useUrl';
import { PermissionListConfig } from '../../../types/permission.type';
import { isUndefined, omitBy } from 'lodash';
import useQueryParms from '../../../hooks/useQueryParms';
import { rolePermissionApi } from '../../../services/rolePermission.api';

function usePermission() {
  const queryClient = useQueryClient();
  const { currentValue } = useUrl({ field: 'page', defaultValue: 1 });
  const queryParams = useQueryParms<PermissionListConfig>();
  const queryConfig: PermissionListConfig = omitBy(
    {
      page: Number(queryParams.page) || 1,
      limit: Number(queryParams.limit) || 6
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['permissions', queryConfig],
    queryFn: () => rolePermissionApi.getAllPermissions(queryConfig)
  });

  const page = Number(currentValue) || 1;
  const totalPages = data?.data.data.pagination.totalPages as number;
  const permissions = data?.data.data.permissions;

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['permissions', { ...queryConfig, page: page + 1 }],
      queryFn: () =>
        rolePermissionApi.getAllPermissions({ ...queryConfig, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['permissions', { ...queryConfig, page: page - 1 }],
      queryFn: () =>
        rolePermissionApi.getAllPermissions({ ...queryConfig, page: page - 1 })
    });
  }

  return { permissions, totalPages, isLoading };
}

export default usePermission;
