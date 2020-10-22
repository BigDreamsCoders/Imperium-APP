import Axios from 'axios';
import {axiosInstance} from './fetch';
import {getToken} from './token';

export const login = async (email, password) => {
  console.log(email, password);
  const token = await getToken();
  console.log(token);
  const {data} = await axiosInstance(token).post('/auth/login', {
    email,
    password,
  });
  // Axios.post('https://imperiumsv-api.herokuapp.com/api/auth/login', {email, password}).then((response)=>{
  //   console.log(response)
  // }).catch((error)=>{
  //   console.log(error);
  // })
  console.log(data)
  return data;
};

export const createAccount = (email, password) => {
  return post('/users', {
    email,
    password,
  });
};
