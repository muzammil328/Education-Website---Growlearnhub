import axios from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  tokenGetter?: () => Promise<string | null>;
  refreshToken?: () => Promise<string | null>;
  onUnauthorized?: () => Promise<void>;
  enableRetry?: boolean;
  enableDedupe?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const DEFAULT_RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000,
  retryStatus: [408, 429, 500, 502, 503, 504] as number[],
};

export function shouldRetry(status: number | undefined, attempt: number): boolean {
  if (!status) return false;
  return DEFAULT_RETRY_CONFIG.retryStatus.includes(status) && attempt < DEFAULT_RETRY_CONFIG.retries;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let refreshPromise: Promise<string | null> | null = null;

export async function enqueueTokenRefresh(refreshToken: () => Promise<string | null>): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export function createDedupeKey(config: RequestConfig): string {
  return JSON.stringify({
    url: config.url,
    method: config.method,
    params: config.params ?? null,
    data: config.data ?? null,
  });
}

const pendingRequests = new Map<string, Promise<unknown>>();

export async function dedupeRequest<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>;
  }
  const promise = fn().finally(() => {
    pendingRequests.delete(key);
  });
  pendingRequests.set(key, promise);
  return promise;
}

export enum ErrorType {
  UNKNOWN = 'UNKNOWN',
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
}

export interface ApiErrorDetails {
  type: ErrorType;
  message: string;
  status: number;
  timestamp: string;
  path?: string;
  meta?: unknown;
}

export class ApiError extends Error {
  details: ApiErrorDetails;

  constructor(details: { type?: ErrorType; message: string; status?: number; timestamp?: string; path?: string; meta?: unknown }) {
    super(details.message);
    this.details = {
      type: details.type ?? ErrorType.UNKNOWN,
      message: details.message,
      status: details.status ?? 500,
      timestamp: details.timestamp ?? new Date().toISOString(),
      path: details.path,
      meta: details.meta,
    };
    this.name = 'ApiError';
  }
}

export function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isAxiosError(error)) {
    const err = error;
    if (!err.response) {
      return new ApiError({
        type: err.code === 'ECONNABORTED' ? ErrorType.TIMEOUT : ErrorType.NETWORK,
        message: err.code === 'ECONNABORTED' ? 'Request timed out' : 'Network error',
      });
    }
    const status = err.response.status;
    const serverMessage = (err.response.data as { message?: string })?.message;
    if (status === 401 || status === 403) {
      return new ApiError({
        type: ErrorType.AUTH,
        message: serverMessage ?? 'Authentication error',
        status,
      });
    }
    if (status === 404) {
      return new ApiError({
        type: ErrorType.VALIDATION,
        message: serverMessage ?? 'Resource not found',
        status,
      });
    }
    if (status >= 400 && status < 500) {
      return new ApiError({
        type: ErrorType.VALIDATION,
        message: serverMessage ?? 'Invalid request',
        status,
      });
    }
    return new ApiError({
      type: ErrorType.SERVER,
      message: serverMessage ?? 'Server error',
      status,
    });
  }
  if (error instanceof Error) {
    return new ApiError({
      type: ErrorType.SERVER,
      message: error.message,
    });
  }
  return new ApiError({
    type: ErrorType.UNKNOWN,
    message: 'Unknown error',
  });
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.details.message;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}
