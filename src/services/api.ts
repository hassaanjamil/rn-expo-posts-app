import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/constants';

// Create a new Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Helper functions for making API requests
const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.get(url, { params });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const post = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.post(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const put = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.put(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.delete(url);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export { get, post, put, del };

export default api;
