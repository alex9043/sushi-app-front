import axios from '@/plugins/axios/axios';

export const getAccount = () => {
  return axios.get('/account/profile');
};

export const getAccounts = () => {
  return axios.get('/account');
};

export const getUser = (userId) => {
  return axios.get(`/account/${userId}`);
};

export const updateAccount = (data) => {
  return axios.put('/account', data);
};

export const updatePassword = (data) => {
  return axios.put('/account/password', data);
};

export const putUser = ({ data, userId }) => {
  return axios.put(`/account/${userId}`, data);
};

export const deleteUser = (userId) => {
  return axios.delete(`/account/${userId}`);
};
