import { useMemo } from 'react';
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
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import CreateUserContent from './components/CreateUserContent';
import { FaPlusCircle } from 'react-icons/fa';
import { useAuthStore } from '../../store/auth.store';
import { authApi } from '../../services/auth.api';
import { SelectOptsType } from '../../types/utils.type';

const PAGE_LIMIT = 6;

export default function Users() {
  const { user: userLoggined } = useAuthStore();

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

  const { data: rolesRes } = useQuery({
    queryKey: ['roles'],
    queryFn: authApi.getAllRoles
  });

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

  const rolesOpts: SelectOptsType[] = useMemo(
    () =>
      rolesRes?.data?.data?.roles.map((role) => ({
        label: role.name,
        value: role._id
      })) || [],
    [rolesRes?.data?.data?.roles]
  );

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage users" />
          <Modal>
            <Modal.Open openWindowName="create-user">
              <Button
                variant="md"
                icon={<FaPlusCircle size={18} />}
                className="gap-3"
              >
                create new user
              </Button>
            </Modal.Open>
            <Modal.Window name="create-user">
              <CreateUserContent rolesOpts={rolesOpts} />
            </Modal.Window>
          </Modal>
        </div>
        <UserOperator rolesOpts={rolesOpts} />
      </div>
      {isLoading && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && (
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
              render={(user) => {
                if (user._id === userLoggined?._id) return null;
                return (
                  <UserRow user={user} key={user._id} rolesOpts={rolesOpts} />
                );
              }}
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
