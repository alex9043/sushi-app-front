import axios from '@/plugins/axios/axios';

export const register = (payload) => axios.post('/auth/sign-up', payload);
export const login = (payload) => axios.post('/auth/sign-in', payload);
