export type Review = {
  _id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  tour: {
    _id: string;
    name: string;
  };
  createdAt: string;
};

export type ReviewList = {
  reviews: Review[];
  pagination: {
    total: number;
    totalPages: number;
  };
};

export type ReviewListConfig = {
  limit?: number;
  page?: number;
  rating?: number;
  sort?: string;
  rating_gte?: number;
  rating_lte?: number;
  rating_gt?: number;
  rating_lt?: number;
};
