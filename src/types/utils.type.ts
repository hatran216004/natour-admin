export type SuccessResponseApi<Data> = {
  status: string;
  data: Data;
};

export type AuthSuccessResponseApi<Data> = {
  status: string;
  data: Data;
  token?: string;
};

export type ErrorResponseApi = {
  status: string;
  message: string;
};

export type SelectOptsType = {
  label: string;
  value: string;
};
