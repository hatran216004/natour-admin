import axios, { type AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://natours-api-chi.vercel.app/api/v2',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }
}

export default new Http().instance;
