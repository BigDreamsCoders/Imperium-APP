import { axiosInstance } from './fetch';

export const getWorkstationsCategory = async (token) => {
  const { data } = await axiosInstance(token).get('/workstation/category');
  return data.categories;
};

export const getAvailableWorkstationByCategory = async (token, id) => {
  const { data } = await axiosInstance(token).get(
    `/workstation/available/${id}`,
  );
  return data;
};

export const useWorkstation = async ({ token, id, userId, actionId }) => {
  try {
    const { data } = await axiosInstance(token).post(`/workstation/use/${id}`, {
      actionId,
      userId,
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};
