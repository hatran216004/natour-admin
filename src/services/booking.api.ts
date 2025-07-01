import { Booking, BookingList } from '../types/booking.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const bookingApi = {
  getAllBookings: () => http.get<SuccessResponseApi<BookingList>>('/bookings'),
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
    )
};
