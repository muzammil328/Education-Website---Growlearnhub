'use client';

import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { useBooksByClassAndServiceSlug } from '@/hooks/use-public';
import McqsInlineSection from '@/components/mcqs/McqsInlineSection';

const CLASS_SLUG = 'class-11';
const SERVICE_SLUG = 'mcqs';

export default function Class11McqsPage() {
  const { books, isLoading, error } = useBooksByClassAndServiceSlug(CLASS_SLUG, SERVICE_SLUG);

  return (
    <UserLayout
      title="Class 11 MCQs | Free Interactive Practice Questions | GrowLearnHub"
      image="/11th/class_11_mcqs.webp"
      canonical="/class-11/mcqs/"
      url="https://growlearnhub.com/class-11/mcqs/"
    >
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 11 MCQs - Subject-wise Practice
          </Heading2>
          <p className="text-base">
            Practice Class 11 MCQs by subject, then move into chapter and topic-level practice
            with the dedicated server-rendered routes.
          </p>
        </header>

        <section className="mb-8">
          <p className="text-foreground/80">
            Our collection is organized by class and subject so students can quickly find the
            material they need. Whether you are revising concepts, preparing for exams, or looking
            for study material, this page helps you reach the right section faster.
          </p>
          <p className="mt-4 text-foreground/80">
            Explore{' '}
            <a href={`/${CLASS_SLUG}/${SERVICE_SLUG}`} className="font-medium text-primary hover:underline">
              Class 11 MCQs
            </a>
            {' easily.'}
          </p>
        </section>

        <section className="mb-12">
          <Heading2>Available Subjects</Heading2>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70 mt-4">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading subjects...
            </div>
          ) : error ? (
            <p className="text-red-500 mt-4">Failed to load subjects. Please try again later.</p>
          ) : books && books.length > 0 ? (
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {books.map(book => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/${SERVICE_SLUG}/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No subjects available at the moment.</p>
          )}
        </section>

        <McqsInlineSection classSlug={CLASS_SLUG} />

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
