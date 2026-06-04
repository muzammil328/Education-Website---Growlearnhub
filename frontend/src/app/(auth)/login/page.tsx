import React from 'react';
import { Metadata } from 'next';
import { LoginPage } from '@/features/AuthPage/Login/LoginPage';

const data = {
  title: 'Log In | Growlearnhub',
  description: 'Log In to Growlearnhub and start your journey to success.',
  canonical: '/login/',
  url: 'https://growlearnhub.com/login/',
};

export default function Page() {
  return <LoginPage />;
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
