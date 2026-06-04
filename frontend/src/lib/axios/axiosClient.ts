import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { shouldRetry, enqueueTokenRefresh, sleep, DEFAULT_RETRY_CONFIG, normalizeError } from '@/lib/core-utils';
import type { ApiClientConfig } from '@/lib/core-utils';

type RetryableConfig = InternalAxiosRequestConfig & {
  _retry?: number;
  _authRetry?: boolean;
};

let instance: AxiosInstance | null = null;
let globalConfig: ApiClientConfig | null = null;

export function setupApiClient(config: ApiClientConfig): void {
  globalConfig = config;

  instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(async req => {
    if (config.tokenGetter) {
      const token = await config.tokenGetter();

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }

    return req;
  });

  instance.interceptors.response.use(
    res => res,
    async (error: AxiosError<{ message?: string }>) => {
      const req = error.config as RetryableConfig | undefined;
      const status = error.response?.status;

      /**
       * Auth refresh queue
       */
      if (status === 401 && req && !req._authRetry && config.refreshToken) {
        req._authRetry = true;

        const newToken = await enqueueTokenRefresh(config.refreshToken);

        if (newToken && instance) {
          req.headers.Authorization = `Bearer ${newToken}`;
          return instance(req);
        }

        if (config.onUnauthorized) {
          await config.onUnauthorized();
        }
      }

      /**
       * Normal retry
       */
      const attempt = req?._retry ?? 0;

      if (config.enableRetry !== false && req && shouldRetry(status, attempt)) {
        req._retry = attempt + 1;

        await sleep(DEFAULT_RETRY_CONFIG.retryDelay);

        if (instance) {
          return instance(req);
        }
      }

      if (status === 401 && config.onUnauthorized) {
        await config.onUnauthorized();
      }

      return Promise.reject(normalizeError(error));
    }
  );
}

export function getApiClient(): AxiosInstance {
  if (!instance) {
    throw new Error('API client not initialized. Call setupApiClient first.');
  }

  return instance;
}

export function getApiClientConfig(): ApiClientConfig {
  if (!globalConfig) {
    throw new Error('API client config not initialized.');
  }

  return globalConfig;
}

export function resetApiClient(): void {
  instance = null;
  globalConfig = null;
}
