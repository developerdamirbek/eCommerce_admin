import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";
//@ts-ignore
const BASE_URL = import.meta.env.VITE_URL; 

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

request.interceptors.request.use(
  (config) => {
    if (config.url !== "/api/admin-login/") {
      config.headers['Authorization'] = `Token ${Cookies.get('token')}` 
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response:any) => {
    if (response.status === 401) {
      return (window.location.pathname = "/");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
