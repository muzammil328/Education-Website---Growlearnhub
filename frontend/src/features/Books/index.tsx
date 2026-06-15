'use client';

import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Heading3, Para } from '@muzammil328/ui';
import Link from 'next/link';
import { useClassesBySlug } from '@/hooks/use-public';

type BookPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default function BookPage({ title, image, canonical, url }: BookPageProps) {
  const { classes: classItems, isLoading, error } = useClassesBySlug('books');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="max-w-none">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Books – All Classes
          </Heading2>
          <Para className="text-lg text-muted-foreground">
            Welcome to <strong>GrowLearnHub</strong>, your platform for class-wise books and study
            material. Browse subject-wise textbooks for Class 9, 10, 11, and 12 and access organized
            resources for daily study and exam preparation.
          </Para>
        </header>

        <section className="mb-8">
          <Para className="text-muted-foreground">
            Our collection is organized by class and subject so students can quickly find the
            material they need. Whether you are revising concepts, preparing for exams, or looking
            for a textbook by subject, this page helps you reach the right section faster.
          </Para>
          <Para className="mt-4 text-muted-foreground">
            Explore{' '}
            <Link href="/book-point/class-9" className="font-medium text-primary hover:underline">
              Class 9 books
            </Link>{' '}
            and{' '}
            <Link href="/book-point/class-10" className="font-medium text-primary hover:underline">
              Class 10 books
            </Link>
            {' easily.'}
          </Para>
        </section>

        <section className="mb-12">
          <Heading2>Browse Books by Class</Heading2>

          <Para className="mb-8 text-muted-foreground">
            Select your class below to view available textbooks and study resources. This organized
            structure makes it easier to reach the right subject and class section without
            confusion.
          </Para>

          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading classes...
            </div>
          ) : error ? (
            <Para className="text-red-500">Failed to load classes. Please try again later.</Para>
          ) : (
            <ul className="list-inside space-y-1 text-muted-foreground">
              {classItems && classItems.length > 0 ? (
                classItems.map(item => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}/book-point`}
                      className="font-medium text-primary hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>Class 9</li>
                  <li>Class 10</li>
                  <li>Class 11</li>
                  <li>Class 12</li>
                </>
              )}
            </ul>
          )}
        </section>

        <section className="mb-12">
          <Heading2>Why Use This Book Section?</Heading2>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Heading3 className="text-xl font-semibold text-foreground">Class-wise Organization</Heading3>
              <Para className="text-muted-foreground">
                Browse books by class level so you can quickly find relevant study material.
              </Para>
            </div>

            <div className="space-y-3">
              <Heading3 className="text-xl font-semibold text-foreground">Subject-wise Access</Heading3>
              <Para className="text-muted-foreground">
                Open the subjects you need without searching through unrelated content.
              </Para>
            </div>

            <div className="space-y-3">
              <Heading3 className="text-xl font-semibold text-foreground">Exam Support</Heading3>
              <Para className="text-muted-foreground">
                Use textbooks and study resources to support revision and board exam preparation.
              </Para>
            </div>

            <div className="space-y-3">
              <Heading3 className="text-xl font-semibold text-foreground">Mobile-friendly Use</Heading3>
              <Para className="text-muted-foreground">
                Access book sections easily on desktop, tablet, or mobile devices.
              </Para>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <Heading2>Frequently Asked Questions</Heading2>

          <div className="my-6 space-y-6">
            <div>
              <Heading3 className="mb-2 text-lg font-semibold text-foreground">
                Which classes are covered?
              </Heading3>
              <Para className="text-muted-foreground">
                This section is designed for multiple classes, including 9, 10, 11, and 12, based on
                available resources.
              </Para>
            </div>

            <div>
              <Heading3 className="mb-2 text-lg font-semibold text-foreground">
                Which subjects are available?
              </Heading3>
              <Para className="text-muted-foreground">
                Subjects may include Biology, Chemistry, Physics, Mathematics, English, Urdu, and
                more depending on class availability.
              </Para>
            </div>

            <div>
              <Heading3 className="mb-2 text-lg font-semibold text-foreground">
                Can I use these books for exam preparation?
              </Heading3>
              <Para className="text-muted-foreground">
                Yes, class-wise books and study materials can help with revision, concept building,
                and exam preparation.
              </Para>
            </div>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
