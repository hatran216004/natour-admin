import { omitBy, isUndefined } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { userApi } from '../../services/user.api';
import Table from '../../components/Table';
import { UsersListConfig } from '../../types/user.type';
import useQueryParms from '../../hooks/useQueryParms';
import Pagination from '../../components/Pagination';

const PAGE_LIMIT = 6;

export default function Users() {
  const queryParams = useQueryParms<UsersListConfig>();
  const queryConfig: UsersListConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || PAGE_LIMIT,
      sort: queryParams.sort
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getAllUsers(queryConfig)
  });

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pt-7 pb-5 px-5 bg-white rounded-2xl shadow-custom">
      <h3 className="text-lg text-main capitalize font-bold">manage users</h3>
      <div className="relative overflow-y-auto"></div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
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
                <td className="px-6 py-4 center">
                  <PiDotsThreeVerticalBold />
                </td>
              </tr>
            );
          })}
        />
      )}
      <Pagination
        className="ml-auto mt-auto mb-[-10px]"
        totalPages={data?.data.pagination?.totalPages as number}
      />
    </div>
  );
}
