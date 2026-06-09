'use client';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import * as React from 'react';
import { Button } from '@muzammil328/ui';
import { Form, FormEmail, FormPassword } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { useLogin } from '@/hooks/use-auth';
import { loginFormSchema, LoginFormValues } from '@muzammil328/education-packages';

export function LoginForm() {
  const { mutate: loginUser, isPending, reset } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    loginUser(values, {
      onSuccess: response => {
        const { accessToken, refreshToken } = response.data.token;
        setCookie('token', accessToken, { path: '/' });
        setCookie('refreshToken', refreshToken, { path: '/' });
        toast.success(response.message);
        window.location.href = '/dashboard';
      },
      onError: (error: unknown) => {
        let errorMessage = 'Invalid credentials. Please try again.';
        if (typeof error === 'string') errorMessage = error;
        else if (error instanceof Error) errorMessage = error.message || errorMessage;
        toast.error(errorMessage);
        reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormEmail
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          description="We will not share your email."
          leftIcon={<Mail className="h-4 w-4" />}
        />

        <FormPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          description="Password must be at least 8 characters."
          leftIcon={<Lock className="h-4 w-4" />}
        />

        <div className="flex justify-end -mt-2">
          <Link href="/forgot-password/" className="text-sm font-medium text-destructive hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          disabled={isPending}
          loading={isPending || form.formState.isSubmitting}
          className="w-full"
          size="lg"
          title="Login"
        >
          {isPending ? 'Signing in...' : 'Login'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Not a member?{' '}
          <Link href="/register/" className="font-medium text-primary hover:underline">Sign Up</Link>
        </p>
      </form>
    </Form>
  );
}
