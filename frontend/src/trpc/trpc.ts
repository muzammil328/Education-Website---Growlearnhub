import type { AppRouter } from '@backend-trpc/router';
import { createTrpcProvider } from './trpc.provider';
import { TRPCClientError } from '@trpc/client';
import type { inferRouterOutputs } from '@trpc/server';

export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type TrpcError = TRPCClientError<AppRouter>;

export const { trpc, Provider: TrpcProvider } = createTrpcProvider<AppRouter>();
