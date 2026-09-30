import axios from "axios";
import Cookies from "js-cookie";

let isRefreshing = false;

/**
 * Setup axios interceptors for authentication and token refresh
 */
export const setupAxiosInterceptors = () => {
  axios.defaults.baseURL = 'https://styleitafrica.pythonanywhere.com/api/';

  // Check if user is on auth pages (safe for iOS)
  const isAuthPage = () => {
    if (typeof window === 'undefined') return false;
    const href = window.location.href;
    return href.endsWith('login') ||
           href.endsWith('signUp') ||
           href.endsWith('ninUpload') ||
           href.endsWith('resendVerificationLink');
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      
      const user = Cookies.get('user');
      const parsedUser = user ? JSON.parse(user) : null;
      const admin = parsedUser?.role === 'admin'
      const superAdmin = parsedUser?.role === 'superadmin';
      const isAdmin = admin || superAdmin
      if (error?.response?.status === 401 && !isRefreshing && !isAuthPage()) {
        try {
          isRefreshing = true;

          const response = await axios.post(`${isAdmin ? 'admin' : 'user'}/refresh`, {}, {
            headers: {
              Authorization: `Bearer ${Cookies.get('refreshToken')}`,
              Accept: 'application/json'
            },
            withCredentials: true
          });

          if (response?.status === 200) {
            const newToken = response?.data?.access_token[0];
            const newRefreshToken = response?.data?.refresh_token;

            Cookies.set('token', newToken);

            if (newRefreshToken) {
              Cookies.set('refreshToken', newRefreshToken);
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            error.config.headers['Authorization'] = `Bearer ${newToken}`;

            return axios(error.config);
          }

        } catch (refreshError) {
          // Handle user logout
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          Cookies.remove('user');

          if (typeof window !== 'undefined' && isAdmin) {
            window.location.href = '/admin/login';
          }
          if (typeof window !== 'undefined' && !isAdmin) {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);

        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};