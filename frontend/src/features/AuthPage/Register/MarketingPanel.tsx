'use client';

import React, { useEffect, useState } from 'react';
import { Users, BookOpen, BadgeCheck, TrendingUp } from 'lucide-react';
import { config } from '@/config';

const features = [
  {
    icon: Users,
    title: 'Collaborative',
    description: 'Share resources and connect with peers in real-time.',
  },
  {
    icon: BookOpen,
    title: 'Unlimited access',
    description: 'Explore every course with no paywalls or limits.',
  },
  {
    icon: BadgeCheck,
    title: 'Certified',
    description: 'Earn verifiable certificates on completion.',
  },
  {
    icon: TrendingUp,
    title: 'Track progress',
    description: 'Visual dashboards to monitor your growth.',
  },
];

export function MarketingPanel() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="bg-gradient-bg1 flex-1 flex-col relative overflow-hidden m-4 rounded-2xl" style={{ display: isLg ? 'flex' : 'none' }}>

      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-16 xl:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-300 px-4 py-[0.4rem] text-xs font-semibold text-foreground backdrop-blur-md bg-primary-50">
            5000+ learners
          </span>

          <div className="mt-6 mb-8">
            <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-foreground">
              Learn without
            </h1>
            <h1 className="text-3xl xl:text-4xl font-bold italic leading-tight text-primary">
              limits.
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card dark:bg-transparent p-[1.15rem] backdrop-blur-[14px] hover:border-[rgba(20,184,166,0.35)]">
                <div className="mb-[0.85rem] flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-primary-50 text-primary-500">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mb-1.5 text-sm font-semibold text-foreground">
                  {title}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {config.app.NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
}