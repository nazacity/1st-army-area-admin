import axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';

const timeout = 15000;

const { publicRuntimeConfig } = getConfig();

const request = axios.create({
  baseURL: publicRuntimeConfig.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout,
});

const onRequestInterceptor = async (config: AxiosRequestConfig) => {
  return config;
};

request.interceptors.request.use(onRequestInterceptor);

export default request;
