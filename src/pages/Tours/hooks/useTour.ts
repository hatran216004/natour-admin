import { useQuery } from '@tanstack/react-query';
import { tourApi } from '../../../services/tour.api';

function useTour(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => tourApi.getTour(id)
  });
  return { tour: data?.data?.data?.tour, isLoading };
}

export default useTour;
