'use client';
import Link from 'next/link';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/use-auth';
import type { AuthRegisterResponse } from '@muzammil328/education-packages/types';
import { registerFormSchema, RegisterFormValues } from '@muzammil328/education-packages';
import { getErrorMessage } from '@/lib/core-utils';
import { Form, FormString, FormEmail, FormPassword } from '@muzammil328/ui';

export function RegisterForm() {
  const router = useRouter();
  const { mutate: registerUser, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerUser(values, {
      onSuccess: (response: AuthRegisterResponse) => {
        toast.success(response.message || 'Account created successfully!');
        router.push(`/otp-verification?email=${encodeURIComponent(values.email)}`);
      },
      onError: (error: unknown) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormString
          name="username"
          label="Username"
          placeholder="Enter username"
          leftIcon={<User className="h-4 w-4" />}
        />

        <FormEmail
          name="email"
          label="Email address"
          placeholder="Enter your email"
          leftIcon={<Mail className="h-4 w-4" />}
        />

        <FormPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          description="Password must be at least 8 characters."
          leftIcon={<Lock className="h-4 w-4" />}
        />

        {/* Terms */}
        <div className="flex items-start gap-3 py-1">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="terms" className="cursor-pointer text-sm text-muted-foreground">
            I agree to the{' '}
            <Link href="/terms" className="font-medium text-primary hover:underline">Terms</Link>
            {' '}&{' '}
            <Link href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>

        <Button
          loading={isPending || form.formState.isSubmitting}
          className="w-full"
          size="lg"
          title="Register"
        >
          {isPending ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">Login</Link>
        </p>
      </form>
    </Form>
  );
}
