export type SuccessResponseApi<Data> = {
  status: string;
  data: Data;
  token?: string;
  pagination?: {
    total: number;
    totalPages: number;
  };
};

export type ErrorResponseApi = {
  status: string;
  message: string;
};

export type SelectOptsType = {
  label: string;
  value: string;
};
