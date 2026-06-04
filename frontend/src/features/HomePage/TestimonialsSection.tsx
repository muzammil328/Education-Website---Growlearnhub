import { CurvedSvg } from '@/components/svg';
import { Star } from 'lucide-react';

const testimonials = [
  { initials: 'AJ', bg: '#d4f0e0', color: '#128C7E', quote: "Our customer engagement jumped from 35% to 90% using Flow Agent's smart retargeting. The ROI was visible within the first week of going live.", name: 'Akash Jain', role: 'Business Executive, Cosco', featured: true },
  { initials: 'PO', bg: '#fef0d4', color: '#b45309', quote: 'The team has shown exceptional professionalism and a true commitment to customer satisfaction. Setup was done in under 10 minutes.', name: 'Priyal Ostwal', role: 'Marketing Manager, PhysicsWallah', featured: false },
  { initials: 'AM', bg: '#ede4fe', color: '#6d28d9', quote: 'Personalised interactions and instant AI responses improved our engagement rates — and more importantly, our actual sales numbers.', name: 'Achina Mayya', role: 'Founder & CEO, AevyTV', featured: false },
  { initials: 'RS', bg: '#d4eafe', color: '#1d4ed8', quote: 'We went from manual follow-ups to a fully automated funnel on WhatsApp. Conversions tripled and our support load dropped by 60%.', name: 'Rohit Sharma', role: 'Growth Lead, Jaro Education', featured: false },
  { initials: 'NP', bg: '#fde8e0', color: '#b45309', quote: 'The chatbot builder is incredibly intuitive. We launched a full lead-qualification flow in a single afternoon with zero technical help.', name: 'Neha Patel', role: 'Operations Head, HomeLane', featured: false },
  { initials: 'SK', bg: '#d4f5e4', color: '#065f46', quote: 'WhatsApp payments changed everything for us. Checkout inside the chat means no abandoned carts — our revenue per campaign is up 2.4X.', name: 'Suresh Kumar', role: 'E-commerce Director, Brigade', featured: false },
];

function TestiCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="w-[calc(25vw-28px)] min-w-64 shrink-0 rounded-[14px] border border-border bg-background p-8 transition-colors duration-200 hover:border-primary"
    >
      <div className="mb-4 flex gap-0.75">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" color="currentColor" className="text-primary" />
        ))}
      </div>
      <p className="mb-6 text-sm italic leading-[1.9] text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border border-border text-[13px] font-extrabold leading-none"
          style={{ background: t.bg, color: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-semibold leading-[1.4]">{t.name}</div>
          <div className="mt-0.75 text-xs leading-[1.4] text-muted-foreground">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

export default function TestimonialsSection() {
  return (
    <section className="px-14 py-22">
      <div className="mb-13 flex flex-col items-center justify-center">
        <div className="text-primary text-base text-center">Customer Stories</div>
        <h2 className='text-3xl mt-2'>
          Learner's Feedback
        </h2>
        <div className='-mt-2'>
        <CurvedSvg />
        </div>
      </div>

      <div className="flex flex-col gap-5 overflow-hidden">
        {/* Row 1 — left to right */}
        <div className="marquee-track">
          <div className="marquee-forward">
            {row1.map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="marquee-track">
          <div className="marquee-reverse">
            {row2.map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
