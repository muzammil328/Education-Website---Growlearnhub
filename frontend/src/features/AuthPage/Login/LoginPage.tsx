'use client';
import { LoginForm } from '@/features/AuthPage/Login/LoginForm';
import AuthPageWrapper from '../AuthPageWrapper';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <AuthPageWrapper
          title="Welcome Back"
          para="Sign in to your GrowLearnHub account."
        >
          <LoginForm />
        </AuthPageWrapper>
      </div>
    </div>
  );
}
