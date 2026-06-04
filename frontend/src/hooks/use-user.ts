'use client';
import { trpc } from '@/trpc/trpc';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  enrolledClasses?: string[];
  institutionId?: string;
  subscriptionPlan?: 'free' | 'basic' | 'premium' | 'enterprise';
  subscriptionExpiresAt?: string;
}

export const useUser = () => {
  return trpc.auth.getMe.useQuery(
    {},
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
};

// Alias for backward compatibility
export const useCurrentUser = useUser;
