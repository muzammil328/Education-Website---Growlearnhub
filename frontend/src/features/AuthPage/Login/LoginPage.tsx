'use client';
import { useEffect, useState } from 'react';
import { LoginForm } from '@/features/AuthPage/Login/LoginForm';
import AuthPageWrapper from '../AuthPageWrapper';
import { MarketingPanel } from '../Register';

export function LoginPage() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="flex min-h-screen rounded-2xl overflow-hidden container mx-auto">
      <div className="shrink-0" style={{ width: isLg ? '40%' : '100%' }}>
        <AuthPageWrapper title="Welcome Back" para="Sign in to your GrowLearnHub account.">
          <LoginForm />
        </AuthPageWrapper>
      </div>
      <MarketingPanel />
    </div>
  );
}
