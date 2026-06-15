import {
  BookOpen,
  CheckSquare,
  FileText,
  FileSpreadsheet,
  GraduationCap,
  Clock3,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Heading2, Heading3, Para } from '@muzammil328/ui';

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: 'Interactive Books',
    desc: 'Engaging digital textbooks with interactive elements to enhance learning.',
  },
  {
    icon: <CheckSquare className="h-5 w-5 text-primary" />,
    title: 'MCQ Practice',
    desc: 'Thousands of multiple-choice questions to test your knowledge.',
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: 'Comprehensive Notes',
    desc: 'Well-structured notes covering all topics in your curriculum.',
  },
  {
    icon: <Clock3 className="h-5 w-5 text-primary" />,
    title: 'Timed Tests',
    desc: 'Simulate exam conditions with our timed online tests.',
  },
  {
    icon: <FileSpreadsheet className="h-5 w-5 text-primary" />,
    title: 'Past Papers',
    desc: "Access to previous years' exam papers with detailed solutions.",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    title: 'Learning Paths',
    desc: 'Customized learning journeys based on your goals and progress.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="px-4 py-20 md:px-10 lg:px-14">
      <div className="mb-13 text-center">
        <div className="text-primary text-lg text-center">Our Learning Resources</div>
        <Heading2 className='text-3xl mt-2'>
          Everything you need to succeed in your academic journey, all in one place.
        </Heading2>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="bg-background px-8 py-10 transition-colors duration-200 hover:bg-muted/40">
            <div className="mb-5.5 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-muted/40 text-foreground">
              {f.icon}
            </div>
            <Heading3 className="mb-2.5 font-sans text-[17px] font-bold leading-[1.3] text-foreground">
              {f.title}
            </Heading3>
            <Para className="text-sm leading-[1.85] text-muted-foreground">{f.desc}</Para>
          </div>
        ))}
      </div>
    </section>
  );
}
