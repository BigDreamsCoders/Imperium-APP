import { axiosInstance } from './fetch';

export const getRoutines = async (token) => {
  const { data } = await axiosInstance(token).get('/routine');
  return data;
};

export const toogleSaved = async ({ id, token }) => {
  const { data } = await axiosInstance(token).put(`/routine/user/save/${id}`);
  return data;
};

export const getWorkstationsCategory = async (token) => {
  const { data } = await axiosInstance(token).get('/workstation/category');
  return data.categories;
};

export const addRoutine = async ({ token, body }) => {
  const { data } = await axiosInstance(token).post('/routine', body);
  return data;
};

export const getRoutineById = async (token, id) => {
  const {
    data: { data },
  } = await axiosInstance(token).get(`routine/${id}`);
  return data;
};
