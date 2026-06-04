import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { OTPVerificationPage } from '@/features/AuthPage/OTPVerification/OTPVerificationPage';

const data = {
  title: 'OTP Verification | Growlearnhub',
  description: 'OTP Verification to Growlearnhub and start your journey to success.',
  canonical: '/otp-verification/',
  url: 'https://growlearnhub.com/otp-verification/',
};

export default function page() {
  return (
    <Suspense>
      <OTPVerificationPage />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
  },
  alternates: {
    canonical: data.canonical,
  },
  twitter: {
    title: data.title,
    description: data.description,
  },
};
