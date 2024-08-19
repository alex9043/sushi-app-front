import axios from '@/plugins/axios/axios';

export const getCart = () => {
  return axios.get('/cart');
};

export const addToCart = (productId) => {
  return axios.post('/cart', { productId });
};
