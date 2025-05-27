import axios from 'axios';
import { getCookie, setCookie } from '../cookies';
import { redirect } from 'react-router-dom';

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080',
});

export default $axios;
