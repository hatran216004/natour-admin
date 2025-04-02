import { useQuery } from '@tanstack/react-query';
import { tourApi } from '../../services/tour.api';

export default function Tours() {
  const { data, isLoading } = useQuery({
    queryKey: ['tours'],
    queryFn: tourApi.getAllTours
  });

  console.log(data?.data.data.pagination);

  return <div>Tours</div>;
}
