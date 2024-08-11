import axios from 'axios';
// import store from '@/store'; // Импортируем store для доступа к Vuex

axios.defaults.baseURL = 'http://localhost:8080';

// // Add a request interceptor to include the token in headers
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
//
// // Add a response interceptor to handle token refresh logic
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//
//     if (
//       error.response &&
//       error.response.status === 403 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axios.post('/auth/refresh', { refreshToken });
//         const {
//           accessToken,
//           refreshToken: newRefreshToken,
//           roles,
//         } = response.data;
//
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', newRefreshToken);
//
//         store.commit('auth/SET_TOKENS', {
//           accessToken,
//           refreshToken: newRefreshToken,
//         });
//         store.commit('auth/SET_ROLES', roles);
//
//         axios.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${accessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//
//         return axios(originalRequest);
//       } catch (err) {
//         store.commit('auth/LOGOUT');
//         return Promise.reject(err);
//       }
//     }
//
//     return Promise.reject(error);
//   },
// );

export default axios;
