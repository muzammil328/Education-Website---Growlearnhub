import React from 'react';

const team = [
  {
    id: 1,
    number: '01',
    name: 'Muzammil Safdar',
    role: 'Founder & Developer',
    initials: 'MS',
    color: 'oklch(58% 0.103 176.76)',
  },
  {
    id: 2,
    number: '02',
    name: 'Content Team',
    role: 'Notes & MCQ Experts',
    initials: 'CT',
    color: 'oklch(68% 0.16 50)',
  },
  {
    id: 3,
    number: '03',
    name: 'Review Board',
    role: 'Subject Matter Specialists',
    initials: 'RB',
    color: 'oklch(55% 0.12 290)',
  },
  {
    id: 4,
    number: '04',
    name: 'Student Community',
    role: 'Feedback & QA Contributors',
    initials: 'SC',
    color: 'oklch(60% 0.14 160)',
  },
];

function TeamCard({
  number,
  name,
  role,
  initials,
  color,
}: (typeof team)[0]) {
  return (
    <div className="flex flex-col gap-3">
      {/* avatar placeholder — portrait ratio */}
      <div
        className="flex w-full items-center justify-center overflow-hidden rounded-2xl"
        style={{ aspectRatio: '3/4', background: `${color}22` }}
      >
        <span
          className="text-5xl font-extrabold md:text-6xl"
          style={{ color }}
        >
          {initials}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-muted-foreground">{number}</p>
      <p className="-mt-2 text-lg font-bold leading-snug text-foreground">{name}</p>
      <p className="-mt-2 text-sm text-muted-foreground">{role}</p>
    </div>
  );
}

export function TeamSection() {
  return (
    <section
      className="border-b border-border px-6 py-20 md:px-16"
      style={{
        background:
          'linear-gradient(135deg, oklch(92% 0.04 290 / 0.10) 0%, oklch(100% 0 0) 50%, oklch(92% 0.08 80 / 0.10) 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            The people behind<br />GrowLearnHub
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            A dedicated team committed to making quality education free for every Pakistani student.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map(member => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
