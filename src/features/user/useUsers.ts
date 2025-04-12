import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import useUrl from '../../hooks/useUrl';
import useQueryParms from '../../hooks/useQueryParms';
import { UsersListConfig } from '../../types/user.type';
import { isUndefined, omitBy } from 'lodash';
import { userApi } from '../../services/user.api';

const PAGE_LIMIT = 6;

function useUsers() {
  const { currentValue } = useUrl<number>({
    field: 'page',
    defaultValue: 1
  });
  const queryClient = useQueryClient();
  const queryParams = useQueryParms<UsersListConfig>();
  const queryConfig: UsersListConfig = omitBy(
    {
      page: Number(queryParams.page) || 1,
      limit: Number(queryParams.limit) || PAGE_LIMIT,
      sort: queryParams.sort,
      role: queryParams.role,
      active: queryParams.active
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getAllUsers(queryConfig),
    placeholderData: keepPreviousData
  });

  const users = data?.data.data.users || [];
  const totalPages = data?.data.data.pagination?.totalPages as number;
  const page = Number(currentValue);

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['users', { ...queryConfig, page: page + 1 }],
      queryFn: () => userApi.getAllUsers({ ...queryConfig, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['users', { ...queryConfig, page: page - 1 }],
      queryFn: () => userApi.getAllUsers({ ...queryConfig, page: page - 1 })
    });
  }
  return { users, totalPages, isLoading };
}

export default useUsers;
