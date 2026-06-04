import React from 'react';
import { Metadata } from 'next';
import { RegisterPage } from '@/features/AuthPage/Register/RegisterPage';

const data = {
  title: 'Register | Growlearnhub',
  description: 'Register to Growlearnhub and start your journey to success.',
  canonical: '/register/',
  url: 'https://growlearnhub.com/register/',
};

export default function page() {
  return <RegisterPage />;
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
