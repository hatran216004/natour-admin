import {
  Booking,
  BookingList,
  BookingQueryConfig,
  MonthlyRevenue,
  StatusRatio,
  TopBooked
} from '../types/booking.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const bookingApi = {
  getAllBookings: (params: BookingQueryConfig) =>
    http.get<SuccessResponseApi<BookingList>>('/bookings', { params }),
  getBooking: (id: string) =>
    http.get<SuccessResponseApi<{ booking: Booking }>>(`/bookings/${id}`),
  deleteBooking: (id: string) => http.delete(`/bookings/${id}`),
  updateBooking: ({
    id,
    body
  }: {
    id: string;
    body: {
      paymentStatus: string;
      participants: number;
      specialRequirements: string;
    };
  }) =>
    http.patch<SuccessResponseApi<{ booking: Booking }>>(
      `/bookings/${id}`,
      body
    ),
  getMonthlyRevenue: () =>
    http.get<SuccessResponseApi<MonthlyRevenue>>('/bookings/monthly-revenue'),
  getStatusRatio: () =>
    http.get<SuccessResponseApi<StatusRatio>>('/bookings/status-ratio'),
  getTopBooked: (limit?: number) =>
    http.get<SuccessResponseApi<TopBooked>>('/bookings/top-booked', {
      params: { limit }
    })
};
