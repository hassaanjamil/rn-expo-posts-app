import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from '@/main/constants/constants';

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await client.get(url, { params });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const post = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await client.post(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const put = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await client.put(url, data);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await client.delete(url);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export default client;
