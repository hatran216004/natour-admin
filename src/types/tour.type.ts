export type Tour = {
  startLocation: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    description: string;
  };
  _id: string;
  name: string;
  secretTour?: boolean;
  price: number;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  ratingsAverage?: number;
  ratingsQuantity?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: string[];
  startDates: {
    date: Date;
    participants: number;
    // soldOut: boolean;
    // _id: string;
    // id: string;
  }[];
  locations?: {
    type: 'Point';
    coordinates: [number, number];
    description: string;
    day: number;
    _id: string;
  }[];
  guides: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: {
      _id: string;
      name: 'lead-guide' | 'guide';
      description: string;
    };
  }[];
  slug?: string;
  durationWeeks?: number;
};

export type ToursList = {
  tours: Tour[];
  pagination: {
    total: number;
    totalPages: number;
  };
};

export type ToursListConfig = {
  sort?: string;
  limit?: number;
  page?: number;
  name?: string;
  price?: number;
  duration?: number;
  maxGroupSize?: number;
  difficulty?: 'easy' | 'medium' | 'difficult';
  ratingsAverage?: number;
  ratingsQuantity?: number;
  durationWeeks?: number;
};
