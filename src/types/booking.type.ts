export type Booking = {
  _id: string;
  tour: {
    _id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'difficult';
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
  paymentStatus: 'Unpaid' | 'Paid' | 'Cancelled' | 'Refunded' | 'Failed';
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
