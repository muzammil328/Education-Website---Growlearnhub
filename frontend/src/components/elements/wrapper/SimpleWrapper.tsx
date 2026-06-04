'use client';
import React from 'react';
import BaseUserLayout from '@/components/layout/UserLayout';

interface Iprops {
  data?: {
    title: string;
    image?: string;
    canonical: string;
    url: string;
  };
  title?: string;
  image?: string;
  canonical?: string;
  url?: string;
  children?: React.ReactNode;
}

export default function UserLayout(props: Iprops) {
  const { data, title, image, canonical, url, children } = props;

  return (
    <BaseUserLayout
      title={data?.title || title || ''}
      image={data?.image || image}
      canonical={data?.canonical || canonical || ''}
      url={data?.url || url || ''}
    >
      {children}
    </BaseUserLayout>
  );
}
