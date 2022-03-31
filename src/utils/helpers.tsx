import axios from 'axios';
import {API} from '../navigator/constants';
import {getToken} from './api';

// const auth = Buffer.from(`${API.CONSUMER_KEY}:${API.CONSUMER_SECRET}`, 'utf8').toString('base64')
// const auth = await read_from_async_storage

export const protectedAxios = axios.create({
  baseURL: API.SERVER_URL,
  headers: {
    'Content-Type': API.CONTENT_TYPE,
    // Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiY0BtYWlsaW5hdG9yLmNvbSIsImV4cCI6MTY1NDEwMTQ1NH0.v7oNHX8Q6x89y6eZ5v2zGFCF-e1x5qnWxHtaZ_EivFI`,
  },
});
export const unProtectedAxios = axios.create({
  baseURL: API.SERVER_URL,
  headers: {
    'Content-Type': API.CONTENT_TYPE,
    // Authorization: `Basic ${auth}`,
  },
});

protectedAxios.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

//export default unProtectedAxios
