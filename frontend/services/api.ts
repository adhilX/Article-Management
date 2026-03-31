import axios from "axios";
import { store } from "../store/store";
import { setToken, logout } from "../store/slice/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required for cookies
});

// Request interceptor: Attach access token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401s and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loop if refresh also fails with 401/403
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        // Update Redux state with new token
        store.dispatch(setToken(accessToken));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;