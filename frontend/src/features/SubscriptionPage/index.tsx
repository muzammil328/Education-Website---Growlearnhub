'use client';

import React from 'react';
import { Button } from '@muzammil328/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@muzammil328/ui';
import { Check } from 'lucide-react';
import { cn } from '@muzammil328/ui';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  stripePriceId?: string;
}

interface SubscriptionPage {
  onSelectPlan?: (planId: string) => void;
}

const defaultPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'monthly',
    description: 'Perfect for getting started',
    features: [
      { name: 'Limited quizzes per day', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Access to free content', included: true },
      { name: 'Offline access', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Priority support', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: 'monthly',
    description: 'Best for serious learners',
    popular: true,
    features: [
      { name: 'Unlimited quizzes', included: true },
      { name: 'Advanced analytics dashboard', included: true },
      { name: 'All premium content', included: true },
      { name: 'Offline access (PWA)', included: true },
      { name: 'Priority support', included: true },
      { name: 'Exam simulation mode', included: true },
    ],
    stripePriceId: 'price_premium_monthly', // Replace with actual Stripe price ID
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 99.99,
    period: 'yearly',
    description: 'Best value - Save 17%',
    features: [
      { name: 'Everything in Premium', included: true },
      { name: 'Save 17% annually', included: true },
      { name: 'Early access to new features', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
    stripePriceId: 'price_yearly', // Replace with actual Stripe price ID
  },
];

export const SubscriptionPage: React.FC<SubscriptionPage> = ({ onSelectPlan }) => {
  const handleSelectPlan = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      // Default: redirect to checkout or handle subscription
      console.log('Selected plan:', planId);
      // TODO: Integrate with Stripe checkout
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p>Select the perfect plan for your learning journey</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {defaultPlans.map(plan => (
          <Card
            key={plan.id}
            className={cn('relative', plan.popular && 'border-primary shadow-lg scale-105')}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span>
                  /{plan.period === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <span className="h-5 w-5 shrink-0" />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        !feature.included && 'text-muted-foreground line-through'
                      )}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={plan.id === 'free'}
              >
                {plan.id === 'free' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
