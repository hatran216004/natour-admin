import { type TourDifficulty } from './tour.type';

export type BookingStatus =
  | 'Unpaid'
  | 'Paid'
  | 'Cancelled'
  | 'Refunded'
  | 'Failed';

export type Booking = {
  _id: string;
  tour: {
    _id: string;
    name: string;
    difficulty: TourDifficulty;
    duration: number;
    durationWeeks: number;
    imageCover: string;
    price: number;
  };
  user: {
    _id: string;
    photo: string;
    name: string;
    email: string;
  };
  amount: number;
  participants: number;
  paymentStatus: BookingStatus;
  paymentMethod: string;
  orderCode: string;
  startDate: string;
  paymentTime: string;
  createdAt: string;
  updatedAt: string;
  specialRequirements: string;
};

export type BookingList = {
  bookings: Booking[];
  pagination: {
    total: number;
    totalPages: number;
  };
};

export type TopBooked = {
  data: {
    bookedCount: number;
    revenue: number;
    tourId: string;
    tourName: string;
    tourPrice: number;
    photo: string;
  }[];
};

export type MonthlyRevenue = {
  data: {
    totalRevenue: number;
    totalBooking: number;
    year: number;
    month: number;
  }[];
};

export type StatusRatio = {
  data: {
    count: number;
    status: BookingStatus;
  }[];
};

export type BookingListConfig = {
  paymentStatus?: BookingStatus;
};
