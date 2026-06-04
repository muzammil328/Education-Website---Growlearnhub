'use client';

import * as React from 'react';
import { Button } from '@muzammil328/ui';
import { Form, InputOTP, InputOTPGroup, InputOTPSlot } from '@muzammil328/ui/forms';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from '@muzammil328/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  otpVerificationFormSchema,
  OtpVerificationFormValues,
} from '@muzammil328/education-packages';
import { useVerifyOTP } from '@/hooks/use-auth';

export function OTPVerificationForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const router = useRouter();
  const { mutate: otpVerificationUser, isPending, reset } = useVerifyOTP();

  const form = useForm<OtpVerificationFormValues>({
    resolver: zodResolver(otpVerificationFormSchema),
    defaultValues: {
      otp: '',
      email,
    },
  });

  React.useEffect(() => {
    if (email) {
      form.setValue('email', email);
    }
  }, [email, form]);

  const onSubmit = (values: OtpVerificationFormValues) => {
    otpVerificationUser(values, {
      onSuccess: response => {
        toast.success(response.message);
        router.push('/login');
      },
      onError: () => {
        reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
        {email && (
          <p className="text-sm text-muted-foreground">
            OTP sent to: <span className="font-medium text-foreground">{email}</span>
          </p>
        )}
        <input type="hidden" {...form.register('email')} value={email} />
        <div className="space-y-2">
          <InputOTP
            maxLength={6}
            value={form.watch('otp')}
            onChange={(value: string) => form.setValue('otp', value, { shouldValidate: true })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          loading={isPending || form.formState.isSubmitting}
          className="w-full btn-style-1"
          size="lg"
          title="Verify OTP User"
        >
          Verify OTP
        </Button>
      </form>
    </Form>
  );
}
