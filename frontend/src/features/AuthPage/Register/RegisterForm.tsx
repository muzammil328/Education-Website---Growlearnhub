'use client';
import Link from 'next/link';
import { Button } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/use-auth';
import type { AuthRegisterResponse } from '@muzammil328/education-packages/types';
import { registerFormSchema, RegisterFormValues } from '@muzammil328/education-packages';
import { getErrorMessage } from '@/lib/core-utils';
import { Form, FormEmail, FormPassword, FormString } from '@muzammil328/ui/forms';

export function RegisterForm() {
  const router = useRouter();
  const { mutate: registerUser, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
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
        <FormString name="username" label="Username" placeholder="Enter Username" />
        <FormEmail name="email" label="Email address" placeholder="Enter your email" />
        <FormPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          description="Password must be at least 8 characters."
        />

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5 cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer flex-1">
            I agree to the{' '}
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Terms
            </Link>{' '}
            &{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          loading={isPending || form.formState.isSubmitting}
          className="w-full btn-style-1"
          size="lg"
          title="Register User"
        >
          {isPending ? 'Creating Account...' : 'Register'}
        </Button>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            Already have an account?
            <Link href="/login" className="ml-1 font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
