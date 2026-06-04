import React from 'react';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';

interface ClassMcqsPageProps extends UserLayoutProps {
  classSlug: string;
  className: string;
  heading: string;
  intro: string;
  emptyMessage: string;
}

export default async function ClassMcqsPage({
  title,
  image,
  canonical,
  url,
  classSlug,
  className,
  heading,
  intro,
  emptyMessage,
}: ClassMcqsPageProps) {
  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            {heading}
          </Heading2>
          <p className="text-base">{intro}</p>
        </header>

        <section className="mb-8">
          <p className="text-foreground/80">
            Our collection is organized by class and subject so students can quickly find the
            material they need. Whether you are revising concepts, preparing for exams, or looking
            for study material, this page helps you reach the right section faster.
          </p>
          <p className="mt-4 text-foreground/80">
            Explore{' '}
            <a href={`/${classSlug}/mcqs`} className="font-medium text-primary hover:underline">
              {className} MCQs
            </a>
            {' easily.'}
          </p>
        </section>

        <section className="mb-12">
          <Heading2>Why Use This MCQ Section?</Heading2>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Class-wise Organization</h3>
              <p className="text-foreground/80">
                Browse MCQs by class level so you can quickly find relevant study material.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Subject-wise Access</h3>
              <p className="text-foreground/80">
                Open the subjects you need without searching through unrelated content.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Exam Support</h3>
              <p className="text-foreground/80">
                Use MCQs and study resources to support revision and board exam preparation.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Mobile-friendly Use</h3>
              <p className="text-foreground/80">
                Access MCQ sections easily on desktop, tablet, or mobile devices.
              </p>
            </div>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
