import React from 'react';
import Link from 'next/link';

const cards = [
  {
    id: 'card-1',
    image: '/notes-all-classes-growlearnhub.webp',
    title: 'Notes for every chapter, every board',
    description:
      'Syllabus-aligned chapter-wise notes for Punjab Board, Federal Board, and all BISE boards — Class 9 through FSc Part 2. Organised, accurate, and completely free.',
  },
  {
    id: 'card-2',
    image: '/mcqs-point.webp',
    title: 'Thousands of MCQs with instant feedback',
    description:
      'Practice past-paper MCQs organised chapter by chapter. Get the correct answer and a short explanation right away — no waiting, no subscriptions.',
  },
];

const wideCard = {
  title: 'Everything you need — in one free platform',
  description:
    'No sign-up walls. No paywalls. Notes, MCQs, timed tests, and past papers all in one place — built for Pakistani board students from Class 9 to VU.',
  cta: 'Get Started Free',
  href: '/class-9/',
};

const bubbles = [
  { size: 110, color: '#ec4899', label: '50K+',  sub: 'Students',  top: '55%', left: '20%' },
  { size: 90,  color: '#22c55e', label: '10K+',  sub: 'MCQs',      top: '15%', left: '45%' },
  { size: 65,  color: '#60a5fa', label: '5+',    sub: 'Yrs Papers', top: '12%', left: '22%' },
  { size: 70,  color: '#a78bfa', label: '100%',  sub: 'Free',       top: '58%', left: '62%' },
  { size: 60,  color: '#fb923c', label: 'All',   sub: 'Boards',     top: '15%', left: '74%' },
];

function BubbleChart() {
  return (
    <div className="relative h-full w-full">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center justify-center rounded-full text-white"
          style={{
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            top: b.top,
            left: b.left,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="text-sm font-extrabold leading-none">{b.label}</span>
          <span className="text-[10px] font-medium opacity-80">{b.sub}</span>
        </div>
      ))}
    </div>
  );
}

function ImageTopCard({ image, title, description }: (typeof cards)[0]) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function WideBubbleCard() {
  return (
    <div
      className="relative min-h-64 overflow-hidden rounded-2xl p-10"
      style={{
        background:
          'linear-gradient(135deg, oklch(92% 0.04 290 / 0.18) 0%, oklch(100% 0 0 / 0.6) 50%, oklch(92% 0.08 80 / 0.15) 100%)',
      }}
    >
      {/* wavy lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden>
        <path d="M -100 200 Q 300 50 700 250"  stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary" />
        <path d="M -100 300 Q 400 150 800 350" stroke="currentColor" strokeWidth="1"   fill="none" className="text-primary" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* text */}
        <div className="flex max-w-xs flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground">{wideCard.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{wideCard.description}</p>
          <Link
            href={wideCard.href}
            className="self-start rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            {wideCard.cta}
          </Link>
        </div>

        {/* bubble chart */}
        <div className="relative hidden h-52 w-72 shrink-0 md:block">
          <BubbleChart />
        </div>
      </div>
    </div>
  );
}

export function WhyJoinSection() {
  return (
    <section className="border-b border-border bg-background px-6 py-20 md:px-16">
      <div className="mx-auto max-w-5xl">
        {/* header */}
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            Why students choose us
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Built for Pakistani board students — free, focused, and always up to date.
          </p>
        </div>

        {/* bento grid */}
        <div className="flex flex-col gap-5">
          {/* row 1 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {cards.map(c => (
              <ImageTopCard key={c.id} {...c} />
            ))}
          </div>

          {/* row 2 */}
          <WideBubbleCard />
        </div>
      </div>
    </section>
  );
}
