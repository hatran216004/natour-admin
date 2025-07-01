import { useQuery } from '@tanstack/react-query';
import { rolePermissionApi } from '../../../services/rolePermission.api';

function useGetAllPermissions() {
  const { data, isLoading } = useQuery({
    queryKey: ['permissions-all'],
    queryFn: rolePermissionApi.getAllForRole
  });
  const permissions = data?.data.data.permissions;
  return { permissions, isLoading };
}

export default useGetAllPermissions;
