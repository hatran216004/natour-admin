export type Tour = {
  startLocation: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    description: string;
  };
  _id: string;
  name: string;
  secretTour: boolean;
  price: number;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: {
    date: string; // ISO date format
    participants: number;
    soldOut: boolean;
    _id: string;
    id: string;
  }[];
  locations: {
    type: 'Point';
    coordinates: [number, number];
    description: string;
    day: number;
    _id: string;
    id: string;
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
  slug: string;
  durationWeeks: number;
  id: string;
};

export type ToursList = {
  tours: Tour[];
  pagination: {
    total: number;
    totalPages: number;
  };
};
