'use client';
import React from 'react';
import Navbar from '@/components/layout/navbar/page';
import Header from '@/components/layout/header/page';

export default function HomeView() {
  return (
    <React.Fragment>
      <header className="bg-hero bg-hero-2">
        <Navbar />
        <Header />
      </header>
      <main>
        {/* <AboutUs /> */}
        {/* <Service /> */}
      </main>
      {/* <Feedback /> */}
      {/* <Topics /> */}
    </React.Fragment>
  );
}
