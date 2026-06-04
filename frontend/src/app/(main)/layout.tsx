'use client';
import React from 'react';
import Provider from '@/components/Providers';
import Footer from '@/components/layout/footer/page';
import Navbar from '@/components/layout/navbar/page';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
}
