import axios from '@/plugins/axios/axios';

export const getAddresses = () => {
  return axios.get('/addresses');
};

export const getDistricts = () => {
  return axios.get('/addresses/districts');
};
