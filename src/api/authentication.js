import { axiosInstance } from './fetch';

export const login = async ({ email, password }, token) => {
  const { data } = await axiosInstance(token).post('/auth/login', {
    email,
    password,
  });
  return data;
};

export const verifyToken = async (token) => {
  const { data } = await axiosInstance(token).get('/users/me');
  return data;
};
