import React from 'react';
import Link from 'next/link';
import { Container } from '@muzammil328/ui';

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

const resources = [
  {
    icon: '📝',
    title: 'Chapter-wise Notes',
    desc: 'Syllabus-aligned notes for every chapter — Punjab Board, Federal Board, and all BISE boards.',
  },
  {
    icon: '✅',
    title: 'MCQ Practice',
    desc: 'Past-paper MCQs with correct answers and short explanations, organised chapter by chapter.',
  },
  {
    icon: '🕐',
    title: 'Online Tests',
    desc: 'Timed tests that simulate real board conditions. Get instant scores and per-question feedback.',
  },
  {
    icon: '📄',
    title: 'Past Papers',
    desc: 'Five-plus years of past papers for every major board — free to read and download.',
  },
  {
    icon: '📅',
    title: 'Date Sheets',
    desc: 'Up-to-date exam schedules for Punjab, Federal, and BISE boards so you never miss a date.',
  },
  {
    icon: '🏆',
    title: 'Result Updates',
    desc: 'Result announcements published as soon as boards release them — one place, all boards.',
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
      <section className="border-b border-border bg-muted/20 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Free for Pakistani Students</SectionLabel>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Notes, MCQs, Tests &amp;{' '}
              <span className="text-primary">Past Papers</span>
              {' '}— All in One Place
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              GrowLearnHub is Pakistan&apos;s free study platform for Class 9, 10, 11, 12 and VU
              students. Chapter-wise notes, thousands of MCQs, timed online tests, and five-plus
              years of past papers — for every major board.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/class-9/"
                className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Start with Class 9
              </Link>
              <Link
                href="/class-10/"
                className="rounded-xl border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Class 10 →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-border py-10">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-muted/10 py-5 text-center">
                <p className="text-2xl font-extrabold text-primary md:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
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
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              Where would you like to start?
            </h2>
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

      {/* ── RESOURCES ── */}
      <section className="border-b border-border py-14">
        <Container>
          <div className="mb-8 text-center">
            <SectionLabel>What You Get</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              Every resource you need to ace your exams
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              No textbook hunting. No paid subscriptions. Just everything a Pakistani board student
              needs, free and organised.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(r => (
              <div key={r.title} className="bg-background p-6 transition hover:bg-muted/30">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl leading-none">
                  {r.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">{r.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── BOARDS COVERED ── */}
      <section className="border-b border-border bg-muted/20 py-14">
        <Container>
          <div className="mb-8 text-center">
            <SectionLabel>Boards Covered</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              We cover every major Pakistani board
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {boards.map(b => (
              <span
                key={b}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-b border-border py-14">
        <Container>
          <div className="mb-8 text-center">
            <SectionLabel>Student Stories</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
              What students are saying
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm italic leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-primary/5 px-8 py-12 text-center">
            <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
              Ready to start studying smarter?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Join thousands of Pakistani students already using GrowLearnHub to prepare for
              their board exams — completely free.
            </p>
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
