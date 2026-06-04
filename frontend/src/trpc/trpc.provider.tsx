'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink, type CreateTRPCReact } from '@trpc/react-query';
import type { AnyRouter } from '@trpc/server';

export function createTrpcProvider<Router extends AnyRouter>(): {
  trpc: CreateTRPCReact<Router, unknown>;
  Provider: (props: {
    children: React.ReactNode;
    baseUrl: string;
    headers?: () => Record<string, string>;
    onUnauthorized?: () => void;
    onForbidden?: () => void;
  }) => React.ReactElement;
} {
  const trpc = createTRPCReact<Router>() as CreateTRPCReact<Router, unknown>;

  function Provider({
    children,
    baseUrl,
    headers,
    onUnauthorized,
    onForbidden,
  }: {
    children: React.ReactNode;
    baseUrl: string;
    headers?: () => Record<string, string>;
    onUnauthorized?: () => void;
    onForbidden?: () => void;
  }) {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 5 * 60 * 1000, // 5 minutes — matches backend Redis TTL
              refetchOnWindowFocus: false,
            },
          },
        })
    );

    const [client] = useState(() =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${baseUrl}/trpc`,
            headers: () => ({
              'Content-Type': 'application/json',
              ...headers?.(),
            }),
            fetch: async (input, init) => {
              const res = await fetch(input, init);

              if (res.status === 401) onUnauthorized?.();
              if (res.status === 403) onForbidden?.();

              return res;
            },
          }),
        ],
      })
    );

    return (
      <trpc.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </trpc.Provider>
    );
  }

  return { trpc, Provider };
}
