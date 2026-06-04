'use client';
import { Heading3 } from '@muzammil328/ui';
import RequestFeatureForm from './RequestFeatureForm';

export default function RequestFeatureContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          User Experience
        </Heading3>

        <RequestFeatureForm />
      </div>
    </section>
  );
}
