'use client';
import { RegisterForm } from '@/features/AuthPage/Register/RegisterForm';
import AuthPageWrapper from '../AuthPageWrapper';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <AuthPageWrapper
          title="Create Your Account"
          para="Join GrowLearnHub and start your learning journey today!"
        >
          <RegisterForm />
        </AuthPageWrapper>
      </div>
    </div>
  );
}
