import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export interface TrpcClientOptions {
  baseUrl: string;
  headers?: () => Record<string, string>;

  onUnauthorized?: () => void;
  onForbidden?: () => void;
}

export function createTrpcClient<Router extends AnyRouter>(options: TrpcClientOptions) {
  return createTRPCProxyClient<Router>({
    links: [
      httpBatchLink({
        url: `${options.baseUrl}/trpc`,
        headers: () => ({
          'Content-Type': 'application/json',
          ...options.headers?.(),
        }),

        fetch: async (input: URL | RequestInfo, init?: RequestInit) => {
          const res = await fetch(input, init);

          if (res.status === 401) {
            options.onUnauthorized?.();
          }

          if (res.status === 403) {
            options.onForbidden?.();
          }

          return res;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
    ],
  });
}
