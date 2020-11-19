import { axiosInstance } from './fetch';

export const getUser = ({ email, password }, token) => {
  return axiosInstance(token).get('/users');
};

export const restorePassword = ({ email, token }) => {
  return axiosInstance(token).patch('/users/reset/password', { email });
};

export const userSavedRoutines = async (token) => {
  const { data } = await axiosInstance(token).get('routine/user/save');
  return data.data;
};

export const userRoutines = async (token) => {
  const {
    data: { savedRoutines, routines },
  } = await axiosInstance(token).get('users/me');
  return routines.map((routine) => ({
    ...routine,
    saved: savedRoutines.some((savedRoutine) => savedRoutine.id === routine.id),
  }));
};

export const getUserRoutineHistory = async (token) => {
  const { data } = await axiosInstance(token).get('users/me');
  return data.history;
};

export const markEntrance = async ({ token, id }) => {
  return await axiosInstance(token).put(`users/entrance/${id}`);
};

export const findUserFromScan = async (token, id) => {
  const {
    data: { firstName, lastName, isIdentified },
  } = await axiosInstance(token).get(`users/${id}`);
  return {
    firstName,
    lastName,
    isIdentified,
  };
};
