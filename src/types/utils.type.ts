export interface SuccessResponseApi<Data> {
  status: string;
  data: Data;
  token?: string;
  pagination?: {
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponseApi {
  status: string;
  message: string;
}
