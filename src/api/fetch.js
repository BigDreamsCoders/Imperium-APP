import {API_URL} from '../../secrets';
import axios from 'axios';

export const axiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
