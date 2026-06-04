import axios from 'axios';
import { config as appConfig } from '@/config';
import { normalizeError, createDedupeKey, dedupeRequest } from '@/lib/core-utils';
import type { ApiResponse, RequestConfig } from '@/lib/core-utils';
import { getApiClient, getApiClientConfig } from './axiosClient';
import { ServerRequestContext, createServerHeaders } from './serverContext';

type Runtime = 'client' | 'server';

interface ExtendedRequestConfig extends RequestConfig {
  runtime?: Runtime;
  serverContext?: ServerRequestContext;
  dedupe?: boolean;
}

function isServerRuntime(): boolean {
  return typeof window === 'undefined';
}

async function clientRequest<T>(config: RequestConfig): Promise<T> {
  const client = getApiClient();

  const res = await client.request<ApiResponse<T>>({
    url: config.url,
    method: config.method,
    data: config.data,
    params: config.params,
    headers: config.headers,
  });

  return res.data.data;
}

async function serverRequest<T>(config: ExtendedRequestConfig): Promise<T> {
  let baseURL: string;
  try {
    baseURL = getApiClientConfig().baseURL;
  } catch {
    baseURL = appConfig.API_URL ?? 'http://localhost:7000';
  }

  const res = await axios.request<ApiResponse<T>>({
    baseURL,
    url: config.url,
    method: config.method,
    data: config.data,
    params: config.params,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...createServerHeaders(config.serverContext),
      ...config.headers,
    },
  });

  return res.data.data;
}

export async function request<T>(config: ExtendedRequestConfig): Promise<T> {
  try {
    const run = async () => {
      const runtime = config.runtime ?? (isServerRuntime() ? 'server' : 'client');

      if (runtime === 'server') {
        return serverRequest<T>(config);
      }

      return clientRequest<T>(config);
    };

    const apiConfig = getApiClientConfig();
    const shouldDedupe = config.dedupe ?? apiConfig.enableDedupe ?? config.method === 'GET';

    if (shouldDedupe) {
      const key = createDedupeKey(config);
      return dedupeRequest<T>(key, run);
    }

    return run();
  } catch (error) {
    throw normalizeError(error);
  }
}
