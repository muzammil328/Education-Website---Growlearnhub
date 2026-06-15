'use client';

import { useState } from 'react';
import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { CheckCircle, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import { useAuth } from '@/context/AuthContext';
import { Heading1, Heading2, Para, toast } from '@muzammil328/ui';

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, isLoading } = trpc.payment.plans.useQuery(undefined, { refetchOnWindowFocus: false });
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const initSub = trpc.payment.initSubscription.useMutation({
    onSuccess: result => {
      toast.success(`Subscription initiated (Payment ID: ${result.paymentId}). Please complete payment.`);
      setPurchasing(null);
    },
    onError: () => { toast.error('Failed to initiate subscription'); setPurchasing(null); },
  });

  const handleSelect = (planKey: string) => {
    if (!user) { router.push('/login'); return; }
    if (planKey === 'free') return;
    setPurchasing(planKey);
    initSub.mutate({ plan: planKey as 'basic' | 'premium' | 'enterprise' });
  };

  const highlighted = 'premium';

  return (
    <UserLayout title="Pricing | GrowLearnHub">
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <Heading1 className="text-4xl font-bold text-foreground">Choose your plan</Heading1>
          <Para className="text-muted-foreground max-w-lg mx-auto">
            Everything you need to ace your exams — adaptive MCQs, spaced repetition, progress tracking, and more.
          </Para>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.plans.map(plan => {
              const isHighlighted = plan.key === highlighted;
              return (
                <div
                  key={plan.key}
                  className={cn(
                    'rounded-2xl border p-6 flex flex-col gap-5 relative transition',
                    isHighlighted
                      ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                      : 'border-border bg-card',
                  )}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <Heading2 className="text-lg font-bold text-foreground">{plan.label}</Heading2>
                    <div className="mt-2 flex items-baseline gap-1">
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-foreground">Free</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-foreground">PKR {plan.price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">/mo</span>
                        </>
                      )}
                    </div>
                    {plan.maxStudents && (
                      <Para className="text-xs text-muted-foreground mt-1">Up to {plan.maxStudents.toLocaleString()} students</Para>
                    )}
                  </div>

                  <ul className="space-y-2 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(plan.key)}
                    disabled={plan.key === 'free' || (purchasing === plan.key && initSub.isPending)}
                    className={cn(
                      'w-full py-3 rounded-xl text-sm font-semibold transition',
                      plan.key === 'free'
                        ? 'border border-border text-muted-foreground cursor-default'
                        : isHighlighted
                        ? 'bg-primary text-white hover:opacity-90 disabled:opacity-50'
                        : 'border border-primary text-primary hover:bg-primary/5 disabled:opacity-50',
                    )}
                  >
                    {plan.key === 'free'
                      ? 'Current Plan'
                      : purchasing === plan.key && initSub.isPending
                      ? 'Processing...'
                      : `Get ${plan.label}`}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Para className="text-center text-xs text-muted-foreground mt-10">
          All payments are processed manually. Contact us after initiating to confirm your subscription.
          Prices in PKR. No auto-renewal.
        </Para>
      </div>
    </UserLayout>
  );
}
