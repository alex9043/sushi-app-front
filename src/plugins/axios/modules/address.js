import axios from '@/plugins/axios/axios';

export const getAddresses = () => {
  return axios.get('/addresses');
};

export const getDistricts = () => {
  return axios.get('/addresses/districts');
};

export const createAddress = (payload) => {
  return axios.post('/addresses', payload);
};

export const updateAddress = (payload) => {
  return axios.put(`/addresses/${payload.id}`, payload);
};

export const deleteAddress = (addressId) => {
  return axios.delete(`/addresses/${addressId}`);
};
