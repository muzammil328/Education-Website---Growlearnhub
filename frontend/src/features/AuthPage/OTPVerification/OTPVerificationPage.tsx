'use client';
import { OTPVerificationForm } from '@/features/AuthPage/OTPVerification/OTPVerificationForm';
import AuthPageWrapper from '@/features/AuthPage/AuthPageWrapper';
import { MarketingPanel } from '../Register';

export function OTPVerificationPage() {
  return (
    <div className="flex min-h-screen rounded-2xl overflow-hidden container mx-auto">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-2/5">
            <AuthPageWrapper title="OTP Verification" para="Join EduHub and start your learning journey today!">
              <OTPVerificationForm />
            </AuthPageWrapper>
          </div>
    
          {/* Right Panel - Marketing */}
          <MarketingPanel />
        </div>
  );
}
