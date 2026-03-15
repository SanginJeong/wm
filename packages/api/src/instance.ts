import axios from "axios";

export const backendInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

type TokenGetter = () => string | null;
type RefreshedHandler = (accessToken: string) => void;
type UnauthorizedHandler = () => void;

let _getToken: TokenGetter = () => null;
let _onRefreshed: RefreshedHandler = () => {};
let _onUnauthorized: UnauthorizedHandler = () => {};

export function configureBackendClient(options: {
  getToken: TokenGetter;
  onRefreshed: RefreshedHandler;
  onUnauthorized: UnauthorizedHandler;
}) {
  _getToken = options.getToken;
  _onRefreshed = options.onRefreshed;
  _onUnauthorized = options.onUnauthorized;
}

backendInstance.interceptors.request.use((config) => {
  const token = _getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function flushQueue(token: string) {
  pendingQueue.forEach(({ resolve }) => resolve(token));
  pendingQueue = [];
}

function rejectQueue(err: unknown) {
  pendingQueue.forEach(({ reject }) => reject(err));
  pendingQueue = [];
}

backendInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // 재발급 중인 다른 요청들은 큐에서 대기
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(backendInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await backendInstance.post<{
        success: boolean;
        data: { accessToken: string };
      }>("/auth/refresh");

      const newToken = data.data.accessToken;
      _onRefreshed(newToken);
      flushQueue(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return backendInstance(originalRequest);
    } catch (refreshError) {
      rejectQueue(refreshError);
      _onUnauthorized();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// product fakestore

export const fakestoreInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});
