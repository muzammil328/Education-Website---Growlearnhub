'use client';

import { ThemeProvider } from 'next-themes';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { setupApiClient } from '@/lib/axios';
import { trpc } from '@/trpc/trpc';
import { httpBatchLink } from '@trpc/client';
import { config } from '@/config';
import { AuthProvider } from '../context/AuthContext';

function navigateToLogin() {
  if (typeof window !== 'undefined') {
    deleteCookie('token', { path: '/' });
    deleteCookie('refreshToken', { path: '/' });

    const pathname = window.location.pathname;
    if (pathname === '/login' || pathname === '/login/') {
      return;
    }

    window.location.href = '/login';
  }
}

function isUnauthorizedError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const errorShape = error as {
    message?: string;
    data?: { code?: string; httpStatus?: number };
    shape?: { message?: string; data?: { code?: string; httpStatus?: number } };
  };

  const message = (errorShape.message || errorShape.shape?.message || '').toLowerCase();
  const code = errorShape.data?.code || errorShape.shape?.data?.code;
  const httpStatus = errorShape.data?.httpStatus || errorShape.shape?.data?.httpStatus;

  return message.includes('not authenticated') || code === 'UNAUTHORIZED' || httpStatus === 401;
}

function handleGlobalApiError(error: unknown): void {
  if (isUnauthorizedError(error)) {
    navigateToLogin();
  }
}

async function getAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  return getCookie('token');
}

setupApiClient({
  baseURL: config.API_URL,
  tokenGetter: getAccessToken,
  onUnauthorized: navigateToLogin,
});

export interface QueryProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleGlobalApiError,
        }),
        mutationCache: new MutationCache({
          onError: handleGlobalApiError,
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
          fetch: async (url, opts) => {
            return fetch(url, { ...opts, credentials: 'include' });
          },
          headers: async () => {
            const token = await getAccessToken();

            return token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {};
          },
        }),
      ],
    })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}
