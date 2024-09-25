import axios from '@/plugins/axios/axios.js';

export const getProducts = () => {
  return axios.get('/products');
};

export const getCategories = () => {
  return axios.get('/products/categories');
};

export const postReview = (productId, data) => {
  return axios.post(`/products/${productId}/reviews`, data);
};
