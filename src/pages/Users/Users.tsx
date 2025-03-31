import { omitBy, isUndefined } from 'lodash';
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { userApi } from '../../services/user.api';
import { UsersListConfig } from '../../types/user.type';
import useQueryParms from '../../hooks/useQueryParms';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';
import useUrl from '../../hooks/useUrl';
import Table from '../../components/Table';
import UserRow from '../../components/UserRow';
import Heading from '../../components/Heading';
import UserOperator from '../../components/UserOperator';

const PAGE_LIMIT = 6;

export default function Users() {
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

  const { data, isPending } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getAllUsers(queryConfig),
    placeholderData: keepPreviousData
  });

  const users = data?.data.data.users || [];
  const totalPages = data?.data.pagination?.totalPages as number;
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

  return (
    <Main>
      <div className="flex items-center justify-between">
        <Heading heading="manage users" />
        <UserOperator />
      </div>
      {isPending && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isPending && (
        <>
          <Table>
            <Table.Header>
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  user
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  role
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  actions
                </th>
              </tr>
            </Table.Header>
            <Table.Body
              data={users}
              render={(user) => <UserRow user={user} key={user.id} />}
            />
          </Table>
          <Pagination
            className="ml-auto mt-auto mb-[-12px]"
            totalPages={totalPages}
          />
        </>
      )}
    </Main>
  );
}
