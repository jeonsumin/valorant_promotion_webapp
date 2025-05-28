import axios from 'axios';
import { getCookie, setCookie } from '../cookies';
import { redirect } from 'react-router-dom';

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080',
});

$axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export const createApi = <T>(path: string, params: any): Promise<T> => {
  return $axios.post(path, { ...params });
};



export default $axios;