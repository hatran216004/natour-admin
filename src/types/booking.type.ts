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
  price: number;
  participants: number;
  status: 'confirmed' | 'failed' | 'pending';
  paymentMethod: string;
  paymentId: string;
  specialRequirements: string;
  startDate: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingList = {
  bookings: Booking[];
  pagination: {
    total: number;
    totalPages: number;
  };
};
