import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../../services/review.api';
import { useSearchParams } from 'react-router-dom';
import { ReviewListConfig } from '../../types/review.type';
import useQueryParms from '../../hooks/useQueryParms';
import { isUndefined, omitBy } from 'lodash';

export default function useReviews() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const queryClient = useQueryClient();
  const queryParams = useQueryParms<ReviewListConfig>();
  const queryConfig = omitBy(
    {
      limit: Number(queryParams.limit) || 6,
      page: page || 1,
      rating: queryParams.rating,
      sort: queryParams.sort,
      'rating[gte]': queryParams.rating_gte,
      'rating[lte]': queryParams.rating_lte,
      'rating[gt]': queryParams.rating_gt,
      'rating[lt]': queryParams.rating_lt
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', queryConfig],
    queryFn: () => reviewsApi.getAllReviews(queryConfig)
  });
  const pageCount = Number(data?.data.data.pagination.totalPages);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['reviews', { ...queryConfig, page: page + 1 }],
      queryFn: () =>
        reviewsApi.getAllReviews({ ...queryConfig, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['reviews', { ...queryConfig, page: page - 1 }],
      queryFn: () =>
        reviewsApi.getAllReviews({ ...queryConfig, page: page - 1 })
    });
  }

  return { data: data?.data.data, totalPages: pageCount, isLoading };
}
