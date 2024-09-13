import axios from '@/plugins/axios/axios';

export const getAccount = () => {
  return axios.get('/account');
};

export const updateAccount = (data) => {
  return axios.put('/account', data);
};

export const updatePassword = (data) => {
  return axios.put('/account/password', data);
};
