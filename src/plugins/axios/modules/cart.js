import axios from '@/plugins/axios/axios';

export const getCart = () => {
  return axios.get('/cart');
};

export const addToCart = (productId) => {
  return axios.post('/cart/add', { productId });
};

export const removeFromCart = (productId) => {
  return axios.post('/cart/remove', { productId });
};

export const clearCart = () => {
  return axios.delete('/cart/delete');
};
