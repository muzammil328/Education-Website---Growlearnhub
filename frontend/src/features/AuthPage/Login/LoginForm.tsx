'use client';
import Link from 'next/link';
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
    defaultValues: {
      email: '',
      password: '',
    },
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
        if (typeof error === 'string') {
          errorMessage = error;
        } else if (error instanceof Error) {
          errorMessage = error.message || errorMessage;
        }
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
        />
        <FormPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          description="Password must be at least 8 characters."
        />

        <div className="flex items-end justify-end -mt-3">
          <Link
            href="/forgot-password/"
            className="ml-1 text-sm font-medium text-destructive hover:underline"
          >
            Forgot Password
          </Link>
        </div>

        <Button
          disabled={isPending}
          loading={isPending || form.formState.isSubmitting}
          className="w-full btn-style-1"
          size="lg"
          title="Login User"
        >
          Login
        </Button>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Not a member?{' '}
            <Link href="/register/" className="ml-1 font-medium text-destructive hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
