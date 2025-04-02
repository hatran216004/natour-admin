import { ToursList } from '../types/tour.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const tourApi = {
  getAllTours: () => http.get<SuccessResponseApi<ToursList>>('/tours')
};
