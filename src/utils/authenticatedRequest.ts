import Axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
import getConfig from 'next/config';

const timeout = 60000;

const { publicRuntimeConfig } = getConfig();

const setAuthenticatedHeaders = async () => {
  const accessToken = getCookie('accessToken');
  let headers = {};
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return headers;
};

const authenticatedRequest = Axios.create({
  baseURL:
    publicRuntimeConfig.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout,
});

const onRequestInterceptor = async (config: AxiosRequestConfig) => {
  const headers = await setAuthenticatedHeaders();

  config.headers = headers;

  return config;
};

authenticatedRequest.interceptors.request.use(onRequestInterceptor);

export default authenticatedRequest;
