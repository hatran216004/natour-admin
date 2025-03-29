import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../services/user.api';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getMe
  });

  console.log(data);

  if (isLoading) return <h1>Loading...</h1>;

  return <div className="col-span-9">{data?.data.data.user.name}</div>;
}
