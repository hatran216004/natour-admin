import { Tour, ToursList, ToursListConfig } from '../types/tour.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const tourApi = {
  getAllTours: (params: ToursListConfig) =>
    http.get<SuccessResponseApi<ToursList>>('/tours', { params }),
  deleteTour: (id: string) => http.delete(`/tours/${id}`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createNewTour: (body: any) =>
    http.post<SuccessResponseApi<{ tour: Tour }>>('/tours', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};
