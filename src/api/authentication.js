import { axiosInstance } from './fetch';

export const login = async ({ email, password }) => {
  const { data } = await axiosInstance(null).post('/auth/login', {
    email,
    password,
  });
  return data;
};

export const verifyToken = async (token) => {
  const { data } = await axiosInstance(token).get('/users/me');
  return data;
};
