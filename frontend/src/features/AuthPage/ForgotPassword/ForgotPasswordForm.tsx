'use client';
import { Form, FormEmail, FormPassword } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import * as React from 'react';
import { toast } from '@muzammil328/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useForgotPassword, useResetPassword, useVerifyForgotPassword } from '@/hooks/use-auth';
import {
  forgotPasswordFormSchema,
  otpForgotPasswordFormSchema,
  resetPasswordFormSchema,
} from '@muzammil328/education-packages';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@muzammil328/ui';
import { z } from 'zod';

const flowSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type FlowFormValues = z.infer<typeof flowSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<0 | 1 | 2>(0);
  const [email, setEmail] = React.useState('');

  const { mutate: requestReset, isPending: isEmailPending } = useForgotPassword();
  const { mutate: verifyOTP, isPending: isOTPPending } = useVerifyForgotPassword();
  const { mutate: resetPassword, isPending: isPasswordPending } = useResetPassword();

  const form = useForm<FlowFormValues>({
    resolver: zodResolver(flowSchema),
    defaultValues: { email: '', otp: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (values: FlowFormValues) => {
    if (step === 0) {
      const result = forgotPasswordFormSchema.safeParse({ email: values.email ?? '' });
      if (!result.success) {
        for (const issue of result.error.issues) {
          form.setError(issue.path[0] as any, { message: issue.message });
        }
        return;
      }
      setEmail(values.email ?? '');
      requestReset({ email: values.email ?? '' }, {
        onSuccess: response => {
          toast.success(response.message);
          setStep(1);
        },
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : 'Error requesting password reset';
          toast.error(errorMessage);
        },
      });
    } else if (step === 1) {
      const result = otpForgotPasswordFormSchema.safeParse({
        email: values.email ?? '',
        otp: values.otp ?? '',
      });
      if (!result.success) {
        for (const issue of result.error.issues) {
          form.setError(issue.path[0] as any, { message: issue.message });
        }
        return;
      }
      verifyOTP({ email: values.email ?? '', otp: values.otp ?? '' }, {
        onSuccess: response => {
          toast.success(response.message);
          setStep(2);
        },
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : 'Error verifying OTP';
          toast.error(errorMessage);
        },
      });
    } else if (step === 2) {
      const result = resetPasswordFormSchema.safeParse({
        password: values.password ?? '',
        confirmPassword: values.confirmPassword ?? '',
      });
      if (!result.success) {
        for (const issue of result.error.issues) {
          form.setError(issue.path[0] as any, { message: issue.message });
        }
        return;
      }
      resetPassword(
        { email: values.email ?? '', newPassword: values.password ?? '' },
        {
          onSuccess: () => {
            toast.success('Password reset successfully');
            router.push('/login');
          },
          onError: (error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : 'Error resetting password';
            toast.error(errorMessage);
          },
        }
      );
    }
  };

  const buttonConfig = {
    0: { label: 'Forgot Password', loading: isEmailPending },
    1: { label: 'Verify Password', loading: isOTPPending },
    2: { label: 'Reset Password', loading: isPasswordPending },
  }[step];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormEmail name="email" label="Email address" placeholder="Enter your email address" />

        {step >= 1 && (
          <>
            {email && (
              <p className="text-sm text-muted-foreground text-center">
                OTP sent to: <span className="font-medium text-foreground">{email}</span>
              </p>
            )}
            <div className="space-y-2 flex justify-center">
              <InputOTP
                maxLength={6}
                className="min-w-full"
                value={form.watch('otp') || ''}
                onChange={(value: string) => form.setValue('otp', value, { shouldValidate: true })}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </>
        )}

        {step >= 2 && (
          <>
            <FormPassword name="password" placeholder="Enter your new password" label="New Password" />
            <FormPassword
              name="confirmPassword"
              placeholder="Confirm your new password"
              label="Confirm Password"
            />
          </>
        )}

        <Button
          loading={buttonConfig.loading || form.formState.isSubmitting}
          className="w-full btn-style-1"
          size="lg"
          title={buttonConfig.label}
        >
          {buttonConfig.label}
        </Button>
      </form>
    </Form>
  );
}
