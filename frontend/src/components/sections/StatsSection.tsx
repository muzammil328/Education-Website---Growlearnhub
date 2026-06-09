import React from 'react';
import Link from 'next/link';
import { BarChart2 } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Active Students' },
  { value: '10,000+', label: 'MCQs Available' },
  { value: '5+',      label: 'Years Past Papers' },
  { value: '100%',    label: 'Free Forever' },
];

const barHeights = [40, 65, 30, 80, 55, 90, 70];

export function StatsSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-border px-6 py-16 md:px-16 md:py-20"
      style={{
        background:
          'linear-gradient(120deg, oklch(92% 0.04 290 / 0.18) 0%, oklch(100% 0 0 / 0) 50%, oklch(92% 0.08 176 / 0.14) 100%)',
      }}
    >
      {/* decorative wavy lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M -100 200 Q 400 50 900 300"  stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary" />
        <path d="M -100 350 Q 500 150 1100 400" stroke="currentColor" strokeWidth="1"   fill="none" className="text-primary" />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        {/* headline */}
        <h2 className="mb-10 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
          Numbers that speak<br />
          <span className="font-semibold text-muted-foreground">for themselves</span>
        </h2>

        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">

          {/* left: image + floating bar chart card */}
          <div className="relative min-h-80 w-full md:w-1/2">
            <img
              src="/book_point.webp"
              alt="GrowLearnHub study materials"
              className="h-full w-[78%] rounded-2xl object-cover"
            />

            {/* floating bar chart card */}
            <div
              className="absolute bottom-0 right-0 z-10 w-52 rounded-2xl p-5 shadow-xl"
              style={{ background: 'oklch(68% 0.16 50)' }}
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <BarChart2 className="h-4 w-4" />
                Student Growth
              </div>
              <p className="text-2xl font-extrabold text-white">50K+</p>
              <p className="mt-1 text-xs text-white/70">Active this month</p>

              {/* decorative bar chart */}
              <div className="mt-4 flex h-10 items-end gap-1.5">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-white/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right: stats grid + CTA */}
          <div className="flex w-full flex-col justify-between gap-8 rounded-2xl bg-background p-8 shadow-sm ring-1 ring-border md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {stats.map(s => (
                <div key={s.label} className="flex flex-col gap-1">
                  <p className="text-3xl font-extrabold text-primary md:text-4xl">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/class-9/"
              className="w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Start Learning Free
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
