import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../services/auth.api';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import FilterSelect from '../FilterSelect';
import { SelectOptsType } from '../../types/utils.type';
import { Role } from '../../types/role.type';

export default function UserOperator({
  setRoles
}: {
  setRoles: Dispatch<SetStateAction<Role[]>>;
}) {
  const { data } = useQuery({
    queryKey: ['roles'],
    queryFn: authApi.getAllRoles
  });

  useEffect(() => {
    setRoles(data?.data.data.roles as Role[]);
  }, [data, setRoles]);

  const roles = useMemo(() => data?.data.data.roles ?? [], [data]);
  const rolesOptions: SelectOptsType[] = roles.map((role) => ({
    label: role.name,
    value: role._id
  }));
  const userOptions: SelectOptsType[] = [
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
