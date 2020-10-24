import { axiosInstance } from './fetch';

export const getUsers = ({ email, password }, token) => {
  return axiosInstance(token).get('/users');
};
