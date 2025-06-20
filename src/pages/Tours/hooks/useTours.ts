import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isUndefined, omitBy } from 'lodash';
import useUrl from '../../../hooks/useUrl';
import { Tour, ToursListConfig } from '../../../types/tour.type';
import useQueryParms from '../../../hooks/useQueryParms';
import { tourApi } from '../../../services/tour.api';

function useTours() {
  const { currentValue } = useUrl<number>({ field: 'page', defaultValue: 1 });
  const page = Number(currentValue);
  const queryClient = useQueryClient();
  const queryParams = useQueryParms<ToursListConfig>();
  const queryConfig: ToursListConfig = omitBy(
    {
      limit: Number(queryParams.limit) || 3,
      page: Number(queryParams.page) || 1,
      sort: queryParams.sort,
      name: queryParams.name,
      price: queryParams.price,
      duration: queryParams.duration,
      maxGroupSize: queryParams.maxGroupSize,
      difficulty: queryParams.difficulty,
      ratingsAverage: queryParams.ratingsAverage,
      ratingsQuantity: queryParams.ratingsQuantity,
      durationWeeks: queryParams.durationWeeks
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['tours', queryConfig],
    queryFn: () => tourApi.getAllTours(queryConfig)
  });

  const tours: Tour[] = data?.data.data.tours || [];
  const totalPages = data?.data.data.pagination.totalPages as number;

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['tours', { ...queryConfig, page: page + 1 }],
      queryFn: () => tourApi.getAllTours({ ...queryConfig, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['tours', { ...queryConfig, page: page - 1 }],
      queryFn: () => tourApi.getAllTours({ ...queryConfig, page: page - 1 })
    });
  }
  return { tours, isLoading, totalPages };
}

export default useTours;
