import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';

function useGuides() {
  const { data, isLoading } = useQuery({
    queryKey: ['guides'],
    queryFn: userApi.getAllGuides
  });
  return { guides: data?.data.data.guides, isLoading };
}

export default useGuides;
