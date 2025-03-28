export interface SuccessResponseApi<Data> {
  status: string;
  data: Data;
  token?: string;
}

export interface ErrorResponseApi {
  status: string;
  message: string;
}
