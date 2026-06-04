import Image from 'next/image';
import { Container } from '@muzammil328/ui';
import { Heading1, Para } from '@muzammil328/ui';
import { Check } from 'lucide-react';

const features = [
  { label: 'Interactive Learning' },
  { label: 'Gamified Resources' },
  { label: 'Quizzes and Assessments' },
];

export default function InteractiveLessons() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50">
      <Container>
        <div className="grid gap-12 md:gap-16 items-center md:grid-cols-2">
          {/* Left: Purple Card with Image and floating quiz cards */}
          <div></div>

          {/* Right: Content */}
          <div>
            <span className="inline-block mb-6 px-4 py-2 text-teal-600 text-xs font-bold uppercase tracking-widest">
              Interactive Lessons
            </span>

            <Heading1 className="mb-6" weight="extrabold" family="inter" size="lg">
              Fun and Engaging Learning Tools
            </Heading1>

            <Para className="mb-8 text-gray-700 max-w-xl">
              Our platform uses interactive lessons and cool resources like games and quizzes to
              keep your child engaged and excited while learning new things.
            </Para>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
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
