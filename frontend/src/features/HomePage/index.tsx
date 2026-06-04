import React from 'react';
import Services from '@/features/HomePage/Services';
import LearningOffer from '@/features/HomePage/LearningOffer';
import FlexibleScheduling from '@/features/HomePage/FlexibleScheduling';
import InteractiveLessons from '@/features/HomePage/InteractiveLessons';

import Header from '@/components/layout/header/page';
import FeaturesGrid from './FeaturesGrid';
import TestimonialsSection from './TestimonialsSection';
import StatsSection from './StatsSection';
// import AboutUs from "./_components/about";
// import Service from "./_components/service";
// const Feedback = dynamic(
//   () => import("@/app/(main)/_components/feedback/page"),
// );
// const Topics = dynamic(
//   () => import("@/app/(main)/_components/topics/page"),
// );

export default function HomePage() {
  return (
    <React.Fragment>
      <header className="bg-hero bg-hero-2">
        <Header />
      </header>
      <Services />
      <LearningOffer />
      <FlexibleScheduling />
      <InteractiveLessons />
      <StatsSection />
      <FeaturesGrid />
      <TestimonialsSection />
    </React.Fragment>
  );
}
