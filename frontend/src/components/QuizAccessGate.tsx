'use client';

import { useRouter } from 'next/navigation';
import { Crown } from 'lucide-react';
import { Button } from '@muzammil328/ui';
import { useUser } from '@/hooks';

interface QuizAccessGateProps {
  isPremium?: boolean;
  requiredPlan?: 'basic' | 'premium' | 'enterprise';
  children: React.ReactNode;
  classId?: string;
}

const PLAN_HIERARCHY: Record<string, number> = {
  free: 0,
  basic: 1,
  premium: 2,
  enterprise: 3,
};

export function QuizAccessGate({
  isPremium,
  requiredPlan = 'premium',
  children,
  classId,
}: QuizAccessGateProps) {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg" />;
  }

  const userPlan = user?.subscriptionPlan || 'free';
  const userPlanLevel = PLAN_HIERARCHY[userPlan] || 0;
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan] || 2;

  const hasAccess =
    !isPremium ||
    userPlanLevel >= requiredPlanLevel ||
    (classId && user?.enrolledClasses?.includes(classId));

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm mx-auto">
          <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
          <p className="text-sm text-gray-600 mb-4">
            This content requires a {requiredPlan} subscription or higher
          </p>
          <div className="space-y-2">
            <Button onClick={() => router.push('/subscription')} className="w-full">
              Upgrade Now
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/subscription')}
              className="w-full"
            >
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
