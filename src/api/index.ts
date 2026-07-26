import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '@/ui/layout/apolloClient';
import { terminatSession } from '@/utils/logout';
import { refreshSession } from '@/utils/refreshSession';
import { applyRenewRefreshToken, getRefreshTokenHeader } from '@/utils/authHeaders';

// Define custom error type
interface CustomError extends Error {
  response?: AxiosResponse;
  status?: number;
  config?: AxiosRequestConfig;
}

type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

const createAxiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const handleError = async (error: CustomError): Promise<AxiosResponse | CustomError> => {
    if (error.response) {
      error.status = error.response.status;
      switch (error.status) {
        case 401: {
          const success = await refreshSession();
          if (success && error.config) {
            // Retry the original request (JWT cookie is auto-sent)
            const retryInstance = axios.create({ baseURL: BASE_URL, withCredentials: true });

            return retryInstance.request(error.config);
          }

          await terminatSession();
          break;
        }
        case 404:
          console.log('Resource not found');
          break;
        default:
          console.log(`Error: ${error.response.status}`);
      }
    } else {
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };

  const setupInterceptors = () => {
    instance.interceptors.request.use(
      (config) => {
        const refreshToken = getRefreshTokenHeader();

        if (refreshToken) {
          config.headers.refreshtoken = refreshToken;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response) => {
        applyRenewRefreshToken(response.headers);

        return response;
      },
      (error) => handleError(error),
    );
  };

  setupInterceptors();

  return instance;
};

const request = async <T = any>(
  method: ApiMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await createAxiosInstance().request<T>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('get', url, null, config);
};

const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('post', url, data, config);
};

const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('put', url, data, config);
};

const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('delete', url, null, config);
};

const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>('patch', url, data, config);
};

export default {
  get,
  post,
  put,
  delete: del,
  patch,
};
