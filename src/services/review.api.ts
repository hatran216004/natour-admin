import { ReviewList, ReviewListConfig } from '../types/review.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const reviewsApi = {
  getAllReviews: (params: ReviewListConfig) =>
    http.get<SuccessResponseApi<ReviewList>>('/reviews', { params }),
  deleteReview: (reviewId: string) => http.delete(`/reviews/${reviewId}`)
};
