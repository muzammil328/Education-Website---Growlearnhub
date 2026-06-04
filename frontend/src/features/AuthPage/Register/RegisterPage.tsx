'use client';
import { RegisterForm } from '@/features/AuthPage/Register/RegisterForm';
import { MarketingPanel } from '@/features/AuthPage/Register/MarketingPanel';
import AuthPageWrapper from '../AuthPageWrapper';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen rounded-2xl overflow-hidden container mx-auto">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-2/5">
        <AuthPageWrapper title="Create Your Account" para="Join EduHub and start your learning journey today!">
          <RegisterForm />
        </AuthPageWrapper>
      </div>

      {/* Right Panel - Marketing */}
      <MarketingPanel />
    </div>
  );
}
