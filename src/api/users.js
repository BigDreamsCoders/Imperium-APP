import Axios from 'axios';
import { axiosInstance } from './fetch';

export const getUsers = ({ email, password }, token) => {
  return axiosInstance(token).get('/users');
};

export const album = () => {
  return Axios.get('https://reqres.in/api/users');
};
