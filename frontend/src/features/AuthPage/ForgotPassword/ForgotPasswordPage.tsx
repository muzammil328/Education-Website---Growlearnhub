'use client';
import ForgotPasswordForm from '@/features/AuthPage/ForgotPassword/ForgotPasswordForm';
import AuthPageWrapper from '@/features/AuthPage/AuthPageWrapper';
import { MarketingPanel } from '../Register';

export function ForgotPasswordPage() {
  return (

        <div className="flex min-h-screen rounded-2xl overflow-hidden container mx-auto">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-2/5">
            <AuthPageWrapper title="Forgot Password" para="Enter your registered email and we'll send you a reset link.">
              <ForgotPasswordForm />
            </AuthPageWrapper>
          </div>
    
          {/* Right Panel - Marketing */}
          <MarketingPanel />
        </div>
  );
}