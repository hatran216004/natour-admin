import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse
} from 'axios';
import { useAuthStore } from '../store/auth.store';
import { authApi } from '../services/auth.api';
import { ErrorResponseApi } from '../types/utils.type';
import toast from 'react-hot-toast';

interface QueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: AxiosError) => void;
  config: InternalAxiosRequestConfig;
}

interface RefreshTokenResponse {
  status: string;
  token: string;
}

enum HttpStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

// Constants
const DEFAULT_TIMEOUT = 10000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v2`
  : 'http://localhost:3000/api/v2';

class Http {
  instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    this.setupInterceptors();
  }

  /**
   * Xử lý lại các request bị chặn sau khi refresh token
   */
  private processQueue(error: AxiosError | null, token?: string): void {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else {
        // Cập nhật token mới vào header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // Gửi lại request với token mới
        this.instance(config).then(resolve).catch(reject);
      }
    });
    this.failedQueue = [];
  }

  /**
   * Kiểm tra xem error có phải là token-related không
   */
  private isTokenError(error: AxiosError<ErrorResponseApi>): boolean {
    const errorMessage = error.response?.data?.message?.toLowerCase();
    return errorMessage!.includes('token') || errorMessage!.includes('jwt');
  }

  /**
   * Xử lý lỗi password changed
   */
  private handlePasswordChangedError(
    error: AxiosError<ErrorResponseApi>
  ): boolean {
    const errorMessage = error.response?.data?.message?.toLowerCase();
    const passwordChanged = useAuthStore.getState().user?.passwordChangedAt;

    if (
      error.response?.status === HttpStatus.UNAUTHORIZED &&
      passwordChanged &&
      errorMessage?.includes('password')
    ) {
      toast.error('User recently changed password! Please log in again.');
      return true;
    }
    return false;
  }

  /**
   * Xử lý lỗi forbidden
   */
  private handleForbiddenError(error: AxiosError): boolean {
    if (error.response?.status === HttpStatus.FORBIDDEN) {
      toast.error("You don't have permission to access this route");
      return true;
    }
    return false;
  }

  /**
   * Thực hiện refresh token
   */
  private async refreshToken(): Promise<string> {
    try {
      const response = await this.instance.patch<RefreshTokenResponse>(
        '/users/refresh-token'
      );
      const newAccessToken = response.data.token;

      // Cập nhật token mới vào store
      useAuthStore.getState().setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      // Logout user khi refresh token thất bại
      await this.logoutUser();
      throw error;
    }
  }

  /**
   * Logout user và clean up
   */
  private async logoutUser(): Promise<void> {
    const { setAccessToken, setUser } = useAuthStore.getState();
    setUser(null);
    setAccessToken(null);

    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }
  }

  /**
   * Xử lý refresh token cho request bị lỗi 401
   */
  private async handleTokenRefresh(
    originalConfig: InternalAxiosRequestConfig & { _retry?: boolean }
  ): Promise<AxiosResponse> {
    // Nếu đang refresh token, thêm request vào queue
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({
          resolve,
          reject,
          config: originalConfig
        });
      });
    }

    // Đánh dấu request đã retry và bắt đầu refresh
    originalConfig._retry = true;
    this.isRefreshing = true;

    try {
      const newAccessToken = await this.refreshToken();

      // Cập nhật token cho request gốc
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

      // Xử lý các request trong queue
      this.processQueue(null, newAccessToken);

      // Gửi lại request gốc
      return this.instance(originalConfig);
    } catch (refreshError) {
      // Xử lý tất cả requests trong queue với lỗi
      this.processQueue(refreshError as AxiosError);
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  private setupInterceptors(): void {
    // Request interceptor - thêm token vào header
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = useAuthStore.getState().token;
        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor - xử lý errors và refresh token
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ErrorResponseApi>) => {
        // Xử lý lỗi password changed
        if (this.handlePasswordChangedError(error)) {
          return Promise.reject(error);
        }

        // Xử lý lỗi forbidden
        if (this.handleForbiddenError(error)) {
          return Promise.reject(error);
        }

        // Nếu không phải lỗi token-related, reject ngay
        if (!this.isTokenError(error)) {
          return Promise.reject(error);
        }

        const originalConfig = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Xử lý refresh token cho lỗi 401
        if (
          error.response?.status === HttpStatus.UNAUTHORIZED &&
          !originalConfig._retry
        ) {
          try {
            return await this.handleTokenRefresh(originalConfig);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Thêm method để manually refresh token (nếu cần)
   */
  public async forceRefreshToken(): Promise<void> {
    if (this.isRefreshing) {
      return;
    }

    try {
      await this.refreshToken();
    } catch (error) {
      console.error('Force refresh token failed:', error);
      throw error;
    }
  }

  /**
   * Thêm method để clear queue (nếu cần)
   */
  public clearQueue(): void {
    this.failedQueue = [];
  }

  /**
   * Thêm method để get queue size (for debugging)
   */
  public getQueueSize(): number {
    return this.failedQueue.length;
  }
}

const http = new Http().instance;

export default http;
export { Http };
