import axios from 'axios';
import { AuthService } from '@/services/auth/auth';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const getToken = (): string => {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      try {
        const parsed = JSON.parse(tokens);
        return parsed.accessToken || '';
      } catch {
        return '';
      }
    }
  }
  return '';
};

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const tokens = AuthService.getAuthTokens();
    if (!tokens?.refreshToken) {
      AuthService.clearAuthTokens();
      window.location.href = '/login';
      return Promise.reject(new Error('No refresh token available'));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const newAccessToken = await AuthService.refreshAccessToken(
        tokens.refreshToken,
      );
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      AuthService.clearAuthTokens();
      window.location.href = '/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
