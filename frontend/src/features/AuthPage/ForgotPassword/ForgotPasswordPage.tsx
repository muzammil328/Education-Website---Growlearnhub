'use client';
import { useEffect, useState } from 'react';
import ForgotPasswordForm from '@/features/AuthPage/ForgotPassword/ForgotPasswordForm';
import AuthPageWrapper from '@/features/AuthPage/AuthPageWrapper';
import { MarketingPanel } from '../Register';

export function ForgotPasswordPage() {
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
      {/* Left Panel - Form */}
      <div className="shrink-0" style={{ width: isLg ? '40%' : '100%' }}>
        <AuthPageWrapper title="Forgot Password" para="Enter your registered email and we'll send you a reset link.">
          <ForgotPasswordForm />
        </AuthPageWrapper>
      </div>

      {/* Right Panel - Marketing */}
      <MarketingPanel />
    </div>
  );
}