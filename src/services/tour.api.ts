import { ToursList, ToursListConfig } from '../types/tour.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const tourApi = {
  getAllTours: (params: ToursListConfig) =>
    http.get<SuccessResponseApi<ToursList>>('/tours', { params }),
  deleteTour: (id: string) => http.delete(`/tours/${id}`)
};
