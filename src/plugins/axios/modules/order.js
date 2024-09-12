import axios from '@/plugins/axios/axios';

export const createGuestOrder = (order) => {
  return axios.post('/order/guest', order);
};

export const createUserOrder = (order) => {
  return axios.post('/order/user', order);
};

export const getOrders = () => {
  return axios.get('/order');
};
