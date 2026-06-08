import React from 'react';
import Footer from '@/components/layout/footer/page';
import Navbar from '@/components/layout/navbar/page';
import CallToAction from '@/components/CallToAction';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}
