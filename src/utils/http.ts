import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  type AxiosInstance
} from 'axios';
import { useAuthStore } from '../store/auth.store';
import { authApi } from '../services/auth.api';
import { ErrorResponseApi } from '../types/utils.type';
import toast from 'react-hot-toast';

class Http {
  instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    config: AxiosRequestConfig;
  }> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: `http://localhost:3000/api/v2`,
      // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v2`,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    this.setupInterceptors();
  }

  // Xử lý lại các request bị chặn (do token hết hạn) sau khi nhận được token mới hoặc khi refresh token thất bại.
  private processQueue(
    error: AxiosError | null,
    token: string | null = null
  ): void {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) reject(error);
      else {
        if (config.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        resolve(this.instance(config)); // gửi lại request ban đầu với token mới và hoàn thành Promise
      }
    });
    this.failedQueue = [];
  }

  private setupInterceptors(): void {
    // Interceptor request này chỉ chạy với những request mới được tạo ra sau khi refresh token thành công
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = useAuthStore.getState().token;
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - xử lý refresh token
    this.instance.interceptors.response.use(
      (response) => response, // Trả về response nếu không có lỗi

      async (error: AxiosError<ErrorResponseApi>) => {
        const errorMessage = error.response?.data?.message.toLocaleLowerCase();
        const passwordChanged = useAuthStore.getState().user?.passwordChangedAt;
        if (
          error.response?.status === 401 &&
          passwordChanged &&
          errorMessage?.includes('password')
        ) {
          toast.error('User recently change password! Please log in again.');
          return Promise.reject(error);
        }

        if (error.response?.status === 403) {
          toast.error(`You don't have permission to access this route`);
          return Promise.reject(error);
        }
        if (!errorMessage?.includes('token')) {
          return Promise.reject(error);
        }
        console.log(error);

        // Xử lý khi có lỗi
        const originalConfig = error.config as InternalAxiosRequestConfig & {
          _retry: boolean;
        };
        // Kiểm tra nếu lỗi 401 và chưa thử refresh
        if (error.response?.status === 401 && !originalConfig._retry) {
          // Nếu đang refresh token, request bị lỗi sẽ được đẩy vào failedQueue
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve,
                reject,
                config: originalConfig
              });
            });
          }

          originalConfig._retry = true;
          this.isRefreshing = true;

          try {
            const res = await this.instance.patch<{
              status: string;
              token: string;
            }>('/users/refresh-token');
            const newAccessToken = res.data.token;
            useAuthStore.getState().setAccessToken(newAccessToken);
            // request gốc (originalRequest) đã bị chặn lại trước khi interceptor request có cơ hội chạy => cần cập nhật header của originalConfig
            originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
            this.processQueue(null, newAccessToken);
            // Xử lý các request trong hàng đợi
          } catch (refreshError) {
            // Xử lý khi refresh token thất bại
            // Đăng xuất người dùng khi refresh token không hợp lệ
            const { setAccessToken, setUser } = useAuthStore.getState();
            setUser(null);
            setAccessToken(null);
            await authApi.logout();
            this.processQueue(refreshError as AxiosError, null);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
