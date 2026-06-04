import Image from 'next/image';
import { Container } from '@muzammil328/ui';
import { Heading1, Para } from '@muzammil328/ui';
import { Check } from 'lucide-react';

const features = [
  { label: 'Personalized Learning' },
  { label: 'Expert Tutors' },
  { label: 'Subject Variety' },
  { label: 'Interactive Dashboard' },
];

export default function LearningOffer() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 text-purple-600 text-xs font-bold uppercase tracking-wider">
            What We Offer
          </span>

          <div className="relative inline-block">
            <Heading1 className="mb-4" weight="extrabold" family="inter" size="lg">
              Explore Our Learning Solution
            </Heading1>

            {/* Decorative underline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded"></div>
          </div>

        </div>

        {/* Content Grid */}
        <div className="grid gap-12 md:gap-16 items-center md:grid-cols-2 mt-12">
          {/* Left: Purple Card with Image */}
          <div></div>

          {/* Right: Content */}
          <div>
            <span className="inline-block mb-6 px-4 py-2 text-orange-600 text-xs font-bold uppercase tracking-widest">
              One on One Tutoring
            </span>

            <Heading1 className="mb-6" weight="extrabold" family="inter" size="lg">
              Personalized Sessions for Every Subject
            </Heading1>

            <Para className="mb-8 text-gray-700 max-w-xl">
              Get personalized sessions with experienced tutors for every subject, from math to
              language arts, tailored to meet your child&apos;s individual learning needs, all
              managed through an interactive dashboard for real-time tracking and progress
              monitoring.
            </Para>

            {/* Features Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="fshrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="font-medium text-gray-800">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
