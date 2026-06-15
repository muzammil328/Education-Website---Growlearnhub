import React from 'react';
import Link from 'next/link';
import { Container, Heading1, Heading2, Heading3, Para } from '@muzammil328/ui';
import { BookOpen, CheckSquare, Clock, FileText, CalendarDays, Trophy } from 'lucide-react';
import { ArticlesSection } from '@/components/sections/ArticlesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { WhyJoinSection } from '@/components/sections/WhyJoinSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

// ── data ──────────────────────────────────────────────────────────────────────

const classes = [
  { label: 'Class 9',  href: '/class-9/',  icon: '9️⃣', desc: 'Notes · MCQs · Tests · Papers' },
  { label: 'Class 10', href: '/class-10/', icon: '🔟', desc: 'Notes · MCQs · Tests · Papers' },
  { label: 'Class 11', href: '/class-11/', icon: '📗', desc: 'FSc Part 1 resources' },
  { label: 'Class 12', href: '/class-12/', icon: '📘', desc: 'FSc Part 2 resources' },
  { label: 'VU',       href: '/vu/',        icon: '🎓', desc: 'Virtual University material' },
];

const stats = [
  { value: '50,000+', label: 'Active Students' },
  { value: '10,000+', label: 'MCQs Available' },
  { value: '5+',      label: 'Years Past Papers' },
  { value: '100%',    label: 'Free Forever' },
];

const features = [
  {
    Icon: BookOpen,
    title: 'Chapter-wise Notes',
    desc: 'Syllabus-aligned notes for every chapter — Punjab Board, Federal Board, and all BISE boards.',
  },
  {
    Icon: CheckSquare,
    title: 'MCQ Practice',
    desc: 'Past-paper MCQs with correct answers and short explanations, organised chapter by chapter.',
  },
  {
    Icon: Clock,
    title: 'Online Tests',
    desc: 'Timed tests that simulate real board conditions. Get instant scores and per-question feedback.',
  },
  {
    Icon: FileText,
    title: 'Past Papers',
    desc: 'Five-plus years of past papers for every major board — free to read and download.',
  },
];

const boards = [
  'Punjab Board (PCTB)',
  'Federal Board (FBISE)',
  'BISE Lahore',
  'BISE Rawalpindi',
  'BISE Gujranwala',
  'BISE Multan',
  'BISE Faisalabad',
  'BISE Sargodha',
  'BISE Bahawalpur',
  'BISE DG Khan',
];

const testimonials = [
  {
    initials: 'AA',
    name: 'Ayesha Afzal',
    role: 'Class 9 student, Lahore',
    quote: 'I scored full marks in Biology MCQs thanks to GrowLearnHub. The chapter-wise practice made revision so much easier.',
  },
  {
    initials: 'MH',
    name: 'Muhammad Hassan',
    role: 'Class 10 student, Rawalpindi',
    quote: 'The timed online tests helped me manage my speed in the actual board exam. I highly recommend it to every student.',
  },
  {
    initials: 'SR',
    name: 'Sara Rehman',
    role: 'FSc Part 1, Gujranwala',
    quote: 'Past papers with solutions saved me weeks of searching. Everything is in one place and it is completely free.',
  },
];

// ── components ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="mx-3 mb-8 overflow-hidden rounded-2xl md:mx-6 relative min-h-[520px] flex items-center"
        style={{
          background: 'linear-gradient(135deg, oklch(92% 0.08 176) 0%, oklch(80% 0.10 176) 40%, oklch(70% 0.09 200) 100%)',
        }}
      >
        {/* grid dot pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* decorative circle rings */}
        <div className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2">
          <div className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
          <div className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
          <div className="absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
        </div>

        {/* content grid */}
        <div className="relative z-10 flex w-full flex-col md:flex-row md:items-center">

          {/* left: text */}
          <div className="flex flex-col justify-center px-8 py-12 md:w-[55%] md:px-12 md:py-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm">
              ✦ Free for Pakistani Students
            </span>

            <Heading1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Notes, MCQs, Tests &amp;{' '}
              <span className="text-primary">Past Papers</span>
              {' '}—{' '}
              <br className="hidden sm:block" />
              All in One Place
            </Heading1>

            <Para className="mt-5 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
              Pakistan&apos;s free study platform for Class 9, 10, 11, 12 and VU students.
              Chapter-wise notes, MCQs, timed tests, and past papers — for every major board.
            </Para>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/class-9/"
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Start with Class 9
              </Link>
              <Link
                href="/class-10/"
                className="rounded-full border border-foreground/20 bg-white/60 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-white/80"
              >
                Class 10 →
              </Link>
            </div>
          </div>

          {/* right: image — absolute on desktop, normal flow on mobile */}
          <div className="relative h-64 w-full md:absolute md:right-0 md:top-0 md:h-full md:w-[45%]">
            <img
              src="/home-banner-top.webp"
              alt="Students studying on GrowLearnHub"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-border py-10">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-muted/10 py-5 text-center">
                <Para className="text-2xl font-extrabold text-primary md:text-3xl">{s.value}</Para>
                <Para className="mt-1 text-xs text-muted-foreground">{s.label}</Para>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CLASS NAVIGATION ── */}
      <section className="border-b border-border py-14">
        <Container>
          <div className="mb-8 text-center">
            <SectionLabel>Choose Your Class</SectionLabel>
            <Heading2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              Where would you like to start?
            </Heading2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {classes.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-6 text-center transition hover:border-primary hover:shadow-md"
              >
                <span className="text-4xl">{c.icon}</span>
                <span className="text-base font-bold text-foreground group-hover:text-primary">{c.label}</span>
                <span className="text-xs text-muted-foreground">{c.desc}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURES + SOCIAL PROOF ── */}
      <section className="border-b border-border bg-background py-20 px-6 md:px-16">
        <Container>

          {/* social proof bar */}
          <div className="text-center">
            <Para className="text-base font-semibold text-foreground md:text-lg">
              Trusted by <span className="text-primary">50,000+</span> students across every major Pakistani board
            </Para>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-50 grayscale md:gap-10">
              {boards.map(b => (
                <span key={b} className="text-sm font-bold tracking-wide text-foreground">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* features block */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <Heading2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Every resource you need<br />to ace your exams
            </Heading2>
            <Para className="mt-4 text-base text-muted-foreground">
              No textbook hunting. No paid subscriptions. Just everything a Pakistani board student needs, free.
            </Para>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(f => (
              <div key={f.title} className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <f.Icon className="h-6 w-6 text-white" />
                </div>
                <Heading3 className="text-lg font-bold text-foreground">{f.title}</Heading3>
                <Para className="text-sm leading-relaxed text-muted-foreground">{f.desc}</Para>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* ── WHY GROWLEARNHUB ── */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-24"
        style={{
          background: 'linear-gradient(120deg, oklch(92% 0.04 290 / 0.18) 0%, oklch(100% 0 0 / 0) 50%, oklch(92% 0.08 176 / 0.14) 100%)',
        }}
      >
        {/* decorative wavy lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="none" aria-hidden>
          <path d="M -100 300 Q 400 100 900 400" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary" />
          <path d="M -100 420 Q 500 200 1100 520" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary" />
          <path d="M 200 600 Q 700 350 1200 580" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary" />
        </svg>

        <Container>
          <div className="relative flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

            {/* left: text */}
            <div className="flex max-w-lg flex-col gap-6 md:w-1/2">
              <Heading2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
                Study smarter,<br />score higher
              </Heading2>
              <Para className="text-sm leading-relaxed text-muted-foreground md:text-base">
                GrowLearnHub brings together everything a Pakistani board student needs — chapter-wise notes,
                MCQ practice, timed online tests, and five-plus years of past papers — all in one place,
                completely free. No sign-up barriers, no paywalls.
              </Para>
              <ul className="flex flex-col gap-3">
                {[
                  'Chapter-wise notes aligned to every major board',
                  'Thousands of MCQs with instant feedback',
                  'Timed tests that simulate real board exams',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/class-9/"
                className="mt-2 self-start rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Get Started Free
              </Link>
            </div>

            {/* right: image + floating stat card */}
            <div className="relative min-h-[380px] w-full md:w-1/2">
              <img
                src="/notes-all-classes-growlearnhub.webp"
                alt="GrowLearnHub study notes"
                className="absolute right-0 top-0 h-full w-[88%] rounded-2xl object-cover object-top"
              />

              {/* floating stat card */}
              <div className="absolute bottom-8 left-0 z-10 w-52 rounded-2xl bg-primary p-5 shadow-xl">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Active Students
                </div>
                <Para className="text-3xl font-extrabold text-white">50K+</Para>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                  ↑ Growing every day
                </span>
                <div className="mt-4 opacity-50">
                  <svg viewBox="0 0 100 50" className="w-full">
                    <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" opacity="0.5" />
                    <path d="M 10 45 A 40 40 0 0 1 60 10" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      <ArticlesSection />
      <StatsSection />
      <PricingSection />
      <TeamSection />
      <WhyJoinSection />
      <TestimonialsSection />

      {/* ── CTA ── */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-primary/5 px-8 py-12 text-center">
            <Heading2 className="text-2xl font-extrabold text-foreground md:text-3xl">
              Ready to start studying smarter?
            </Heading2>
            <Para className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Join thousands of Pakistani students already using GrowLearnHub to prepare for
              their board exams — completely free.
            </Para>
            <Link
              href="/class-9/"
              className="mt-6 inline-block rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90"
            >
              Get Started Free →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
