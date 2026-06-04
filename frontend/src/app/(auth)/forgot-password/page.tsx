import React from 'react';
import { Metadata } from 'next';
import { ForgotPasswordPage } from '@/features/AuthPage/ForgotPassword/ForgotPasswordPage';

const data = {
  title: 'Forgot Password | Growlearnhub',
  description: 'Forgot Password to Growlearnhub and start your journey to success.',
  canonical: '/forgot-password/',
  url: 'https://growlearnhub.com/forgot-password/',
};

export default function page() {
  return <ForgotPasswordPage />;
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
