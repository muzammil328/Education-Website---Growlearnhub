'use client';
import React, { useRef, useState, useEffect } from 'react';

// ── data ──────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1, col: 1,
    name: 'Ayesha Afzal', role: 'Class 9 Student, Lahore', rating: 5,
    date: 'March 2024',
    review: 'I scored full marks in Biology MCQs thanks to GrowLearnHub. The chapter-wise practice made revision so much easier before my board exams.',
    initials: 'AA', color: '#ec4899',
  },
  {
    id: 2, col: 2,
    name: 'Muhammad Hassan', role: 'Class 10 Student, Rawalpindi', rating: 5,
    date: 'April 2024',
    review: 'The timed online tests helped me manage my speed in the actual board exam. I highly recommend it to every student. The past papers are especially helpful — they cover every board and every year, all in one place. I used to waste hours searching for papers online but now everything is just a click away.',
    initials: 'MH', color: '#22c55e',
  },
  {
    id: 3, col: 3,
    name: 'Sara Rehman', role: 'FSc Part 1, Gujranwala', rating: 5,
    date: 'January 2024',
    review: 'Past papers with solutions saved me weeks of searching. Everything is in one place and it is completely free.',
    initials: 'SR', color: '#60a5fa',
  },
  {
    id: 4, col: 1,
    name: 'Ali Raza', role: 'Class 11 Student, Faisalabad', rating: 5,
    date: 'February 2024',
    review: 'Notes are accurate and aligned to the Punjab Board syllabus. I used them for every subject and my results improved significantly.',
    initials: 'AR', color: '#a78bfa',
  },
  {
    id: 5, col: 2,
    name: 'Fatima Malik', role: 'Class 12 Student, Multan', rating: 5,
    date: 'May 2024',
    review: 'GrowLearnHub is the best free resource I have found for FSc preparation. The online tests give instant feedback and the MCQs cover all chapters thoroughly.',
    initials: 'FM', color: '#fb923c',
  },
  {
    id: 6, col: 3,
    name: 'Usman Tariq', role: 'VU Student, Islamabad', rating: 5,
    date: 'March 2024',
    review: 'The VU section has exactly what I needed — past papers sorted by semester and subject. Saved me a lot of time during finals.',
    initials: 'UT', color: '#14b8a6',
  },
  {
    id: 7, col: 1,
    name: 'Hina Nawaz', role: 'Class 9 Student, Sargodha', rating: 4,
    date: 'June 2024',
    review: 'Loved the MCQ section. Questions with explanations really help you understand where you went wrong.',
    initials: 'HN', color: '#f59e0b',
  },
  {
    id: 8, col: 3,
    name: 'Bilal Ahmed', role: 'Class 10 Student, Bahawalpur', rating: 5,
    date: 'April 2024',
    review: 'Date sheets and result updates are always on time. I rely on GrowLearnHub for everything exam-related.',
    initials: 'BA', color: '#8b5cf6',
  },
  {
    id: 9, col: 2,
    name: 'Zainab Iqbal', role: 'FSc Part 2, Lahore', rating: 5,
    date: 'May 2024',
    review: 'I was struggling with Chemistry but the chapter-wise notes made it much clearer. Free and excellent quality.',
    initials: 'ZI', color: '#ec4899',
  },
  {
    id: 10, col: 1,
    name: 'Kamran Shah', role: 'Class 11 Student, Peshawar', rating: 5,
    date: 'February 2024',
    review: 'Five years of past papers in one place — that is incredible. No other site gives this for free.',
    initials: 'KS', color: '#22c55e',
  },
  {
    id: 11, col: 3,
    name: 'Amna Butt', role: 'Class 12 Student, Sialkot', rating: 5,
    date: 'June 2024',
    review: 'I recommended GrowLearnHub to my entire class. Everyone uses it now for MCQ practice and test simulations.',
    initials: 'AB', color: '#60a5fa',
  },
  {
    id: 12, col: 2,
    name: 'Saad Hussain', role: 'VU Student, Karachi', rating: 4,
    date: 'March 2024',
    review: 'Handouts and past papers for VU subjects are well organised. The platform is clean and easy to navigate.',
    initials: 'SH', color: '#a78bfa',
  },
];

// ── sub-components ─────────────────────────────────────────────────────────────

type Testimonial = (typeof testimonials)[0];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ t, onClick }: { t: Testimonial; onClick: (t: Testimonial) => void }) {
  return (
    <div
      onClick={() => onClick(t)}
      className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Avatar initials={t.initials} color={t.color} />
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">{t.review}</p>
      <StarRating rating={t.rating} />
    </div>
  );
}

// ── auto-scroll column ─────────────────────────────────────────────────────────

function ScrollColumn({
  items,
  speed,
  onClick,
}: {
  items: Testimonial[];
  speed: number;
  onClick: (t: Testimonial) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const pos = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const step = () => {
      if (!paused.current && el) {
        pos.current += speed;
        const half = el.scrollHeight / 2;
        if (pos.current >= half) pos.current = 0;
        el.scrollTop = pos.current;
      }
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [speed]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 overflow-hidden"
      style={{ maxHeight: 560 }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* duplicate items for seamless loop */}
      {[...items, ...items].map((t, i) => (
        <TestimonialCard key={`${t.id}-${i}`} t={t} onClick={onClick} />
      ))}
    </div>
  );
}

// ── modal ──────────────────────────────────────────────────────────────────────

function TestimonialModal({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* left: large avatar */}
        <div
          className="hidden w-48 shrink-0 items-center justify-center sm:flex"
          style={{ background: `${t.color}18` }}
        >
          <Avatar initials={t.initials} color={t.color} size={80} />
        </div>

        {/* right: details */}
        <div className="flex flex-1 flex-col gap-4 p-7">
          {/* user info */}
          <div className="flex items-center gap-3 sm:hidden">
            <Avatar initials={t.initials} color={t.color} size={48} />
            <div>
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-lg font-bold text-foreground">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
            <StarRating rating={t.rating} />
          </div>

          {/* review */}
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
            &ldquo;{t.review}&rdquo;
          </p>

          {/* footer */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="sm:hidden"><StarRating rating={t.rating} /></div>
            <p className="ml-auto text-xs text-muted-foreground">{t.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── main section ───────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const [active, setActive] = useState<Testimonial | null>(null);

  const col1 = testimonials.filter(t => t.col === 1);
  const col2 = testimonials.filter(t => t.col === 2);
  const col3 = testimonials.filter(t => t.col === 3);

  return (
    <>
      <section
        className="border-b border-border px-6 py-20 md:px-16"
        style={{
          background:
            'linear-gradient(135deg, oklch(92% 0.04 290 / 0.10) 0%, oklch(100% 0 0) 50%, oklch(92% 0.08 80 / 0.10) 100%)',
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* header */}
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              What students are saying
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Thousands of Pakistani students trust GrowLearnHub to prepare for their board exams.
            </p>
          </div>

          {/* mobile: flat list */}
          <div className="flex flex-col gap-4 md:hidden">
            {testimonials.map(t => (
              <TestimonialCard key={t.id} t={t} onClick={setActive} />
            ))}
          </div>

          {/* desktop: 3 auto-scroll columns */}
          <div className="hidden items-start gap-5 md:grid md:grid-cols-3">
            <ScrollColumn items={col1} speed={0.4} onClick={setActive} />
            <ScrollColumn items={col2} speed={0.6} onClick={setActive} />
            <ScrollColumn items={col3} speed={0.5} onClick={setActive} />
          </div>
        </div>
      </section>

      {active && <TestimonialModal t={active} onClose={() => setActive(null)} />}
    </>
  );
}
