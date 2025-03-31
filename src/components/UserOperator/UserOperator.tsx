import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../services/auth.api';
import { useMemo } from 'react';
import FilterSelect from '../FilterSelect';
import { FilterOptsType } from '../../types/utils.type';

export default function UserOperator() {
  const { data } = useQuery({
    queryKey: ['roles'],
    queryFn: authApi.getAllRoles
  });
  const roles = useMemo(() => data?.data.data.roles ?? [], [data]);
  const rolesOptions: FilterOptsType[] = roles.map((role) => ({
    label: role.name,
    value: role._id
  }));

  const userOptions: FilterOptsType[] = [
    {
      label: 'active',
      value: 'true'
    },
    {
      label: 'inactive',
      value: 'false'
    }
  ];

  return (
    <div className="flex items-center gap-8">
      <FilterSelect label="status" options={userOptions} field="active" />
      <FilterSelect label="role" options={rolesOptions} field="role" />
    </div>
  );
}
