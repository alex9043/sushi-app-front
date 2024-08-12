import axios from 'axios';
import store from '@/store';
import router from '@/router';

axios.defaults.baseURL = 'http://localhost:8080';

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use((config) => {
  const accessToken = store.getters['auth/getAccessToken'];

  const requiresAuth = ![
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/refresh-token',
  ].some((url) => config.url.includes(url));

  if (accessToken && requiresAuth) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        store.commit('auth/SET_LOADING', true);

        const refreshToken = store.getters['auth/getRefreshToken'];

        const refreshAxios = axios.create({
          baseURL: 'http://localhost:8080',
        });

        return refreshAxios
          .post('/auth/refresh-token', { refreshToken })
          .then((response) => {
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            store.commit('auth/SET_TOKENS', { accessToken, refreshToken });
            store.dispatch('auth/decodeAndSetAuthState', accessToken);
            processQueue(null, accessToken);

            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          })
          .catch((err) => {
            processQueue(err, null);
            store.commit('auth/LOGOUT');
            router.push({ name: 'Home' });
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
            store.commit('auth/SET_LOADING', false);
          });
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default axios;
