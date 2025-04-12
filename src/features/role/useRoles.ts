import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../services/auth.api';
import { useMemo } from 'react';
import { SelectOptsType } from '../../types/utils.type';

function useRoles() {
  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: authApi.getAllRoles
  });

  const roles = data?.data.data.roles;
  const rolesOpts: SelectOptsType[] = useMemo(
    () =>
      roles?.map((role) => ({
        label: role.name,
        value: role._id
      })) || [],
    [roles]
  );
  return { roles, rolesOpts, isLoading };
}

export default useRoles;
