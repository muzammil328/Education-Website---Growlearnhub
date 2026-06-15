import React from 'react';
import Link from 'next/link';
import { Heading2, Para } from '@muzammil328/ui';

const plans = [
  {
    id: 'class9',
    name: 'Class 9 & 10',
    badgeDark: false,
    description: 'All the essentials for secondary school students preparing for board exams.',
    price: 'Free',
    period: 'forever',
    features: [
      'Chapter-wise notes for all subjects',
      'Past-paper MCQs with answers',
      'Timed online tests',
      '5+ years past papers',
      'Date sheets & result updates',
    ],
    cta: 'Get Started',
    href: '/class-9/',
    featured: false,
  },
  {
    id: 'fsc',
    name: 'FSc Part 1 & 2',
    badgeDark: true,
    description: 'Complete resources for Class 11 and 12 students across every major board.',
    price: 'Free',
    period: 'forever',
    features: [
      'Full FSc notes — all subjects',
      'Chapter-wise MCQ practice',
      'Board-simulated timed tests',
      'Past papers for all boards',
      'Pairing schemes included',
      'Result & date sheet alerts',
    ],
    cta: 'Start with FSc',
    href: '/class-11/',
    featured: true,
  },
  {
    id: 'vu',
    name: 'VU Students',
    badgeDark: false,
    description: 'Virtual University study material, past papers, and subject resources.',
    price: 'Free',
    period: 'forever',
    features: [
      'VU subject notes & handouts',
      'Past papers by semester',
      'MCQ practice per subject',
      'GDB & assignment tips',
      'Exam preparation guides',
    ],
    cta: 'Explore VU Resources',
    href: '/vu/',
    featured: false,
  },
];

function CheckIcon() {
  return (
    <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingCard({
  name, badgeDark, description, price, period, features, cta, href, featured,
}: (typeof plans)[0]) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-2xl border p-7 ${
        featured
          ? 'border-primary shadow-lg'
          : 'border-border shadow-sm'
      }`}
    >
      {/* badge */}
      <span
        className="self-start rounded-full px-4 py-1.5 text-sm font-semibold text-white"
        style={{ backgroundColor: badgeDark ? '#111' : 'oklch(58.40% 0.103 176.76)' }}
      >
        {name}
      </span>

      <Para className="text-sm text-muted-foreground">{description}</Para>

      {/* price */}
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-foreground">{price}</span>
        <span className="text-sm text-muted-foreground">/ {period}</span>
      </div>

      {/* features */}
      <div className="flex flex-col gap-2">
        <Para className="text-sm font-bold text-foreground">Features include:</Para>
        <ul className="flex flex-col gap-2">
          {features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary">
                <CheckIcon />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        href={href}
        className={`mt-auto w-full rounded-full py-3 text-center text-sm font-semibold transition ${
          featured
            ? 'bg-primary text-white hover:opacity-90'
            : 'border border-border text-foreground hover:bg-muted'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="border-b border-border bg-background px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Heading2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            Always free — for every student
          </Heading2>
          <Para className="mt-3 text-sm text-muted-foreground md:text-base">
            No subscriptions, no paywalls. Pick your class and start studying today.
          </Para>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map(plan => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>

      </div>
    </section>
  );
}
