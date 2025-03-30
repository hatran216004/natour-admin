import { omitBy, isUndefined } from 'lodash';
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { userApi } from '../../services/user.api';
import Table from '../../components/Table';
import { UsersListConfig } from '../../types/user.type';
import useQueryParms from '../../hooks/useQueryParms';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';
import useUrl from '../../hooks/useUrl';

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
      sort: queryParams.sort
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getAllUsers(queryConfig),
    placeholderData: keepPreviousData
  });

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
    <Main title="manage users">
      {isLoading && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && (
        <>
          <Table
            render={data?.data.data.users.map((user) => {
              return (
                <tr className="bg-white border-b border-gray-200" key={user.id}>
                  <td
                    scope="row"
                    className="px-6 py-4 flex gap-[14px] items-center"
                  >
                    <img
                      className="w-10 h-10 object-cover rounded-xl"
                      src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${
                        user.photo
                      }`}
                      alt={user.name}
                    />
                    <div>
                      <h2 className="text-main text-sm font-bold capitalize">
                        {user.name}
                      </h2>
                      <h2 className="text-[#718096] text-sm">{user.email}</h2>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`px-4 py-1 text-center ${
                        user.active ? 'bg-[#48BB78]' : 'bg-[#CBD5E0]'
                      } rounded-xl capitalize text-white font-bold`}
                    >
                      {user.active ? 'active' : 'inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center capitalize text-main font-bold">
                    {user.role?.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="center p-3 cursor-pointer">
                      <PiDotsThreeVerticalBold />
                    </div>
                  </td>
                </tr>
              );
            })}
          />
          <Pagination
            className="ml-auto mt-auto mb-[-10px]"
            totalPages={totalPages}
          />
        </>
      )}
    </Main>
  );
}
