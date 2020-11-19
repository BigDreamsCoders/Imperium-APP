import axios from 'axios';
import { env } from './../utils/env';

export const axiosInstance = (token) => {
  return axios.create({
    baseURL: env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
