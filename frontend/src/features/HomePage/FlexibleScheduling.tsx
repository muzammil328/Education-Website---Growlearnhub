import { Container } from '@muzammil328/ui';
import { Heading1, Para } from '@muzammil328/ui';
import { Check } from 'lucide-react';

const features = [
  { label: 'Flexible Learning Flow' },
  { label: 'Relaxed Learning Mode' },
  { label: 'Personalized Learning Journey' },
  { label: 'Pace Perfect' },
];

export default function FlexibleScheduling() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid gap-12 md:gap-16 items-center md:grid-cols-2">
          {/* Left: Content */}
          <div>
            <span className="inline-block mb-6 px-4 py-2 text-purple-600 text-xs font-bold uppercase tracking-widest">
              Flexible Scheduling
            </span>

            <Heading1 className="mb-6" weight="extrabold" family="inter" size="lg">
              Learn at a Pace That Works for You
            </Heading1>

            <p className="mb-8 text-gray-700 max-w-xl">
              There&apos;s no rush! You can take breaks, go back to things you enjoy, and spend as
              much time as you need on each lesson.
            </Para>

            {/* Features Grid */}
            <div className="grid gap-4 md:grid-cols-2">
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

          {/* Right: Orange Card with Image */}
          <div className="relative flex justify-center">
          

          </div>
        </div>
      </Container>
    </section>
  );
}
