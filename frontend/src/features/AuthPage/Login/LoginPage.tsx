'use client';
import { LoginForm } from '@/features/AuthPage/Login/LoginForm';
import { MarketingPanel } from '../Register';
import AuthPageWrapper from '../AuthPageWrapper';

export function LoginPage() {
  return (
    <div className="flex min-h-screen rounded-2xl overflow-hidden container mx-auto">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-2/5">
        <AuthPageWrapper title="Create Your Account" para="Join EduHub and start your learning journey today!">
          <LoginForm />
        </AuthPageWrapper>
      </div>

      {/* Right Panel - Marketing */}
      <MarketingPanel />
    </div>
  );
}
