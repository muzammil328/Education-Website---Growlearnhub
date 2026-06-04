import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import Link from 'next/link';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

interface ClassItem {
  name: string;
  slug: string;
  classId: string;
}

async function getClasses(): Promise<ClassItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.class.getAll.query({ status: 'active' });
    return (result?.data || []).map((item: any) => ({
      classId: item.classId,
      name: item.name,
      slug: item.slug,
    }));
  } catch {
    return [];
  }
}

type BookPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default async function BookPage({ title, image, canonical, url }: BookPageProps) {
  const classItems = await getClasses();

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="max-w-none">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Books – All Classes
          </Heading2>
          <p className="text-lg text-foreground/90">
            Welcome to <strong>GrowLearnHub</strong>, your platform for class-wise books and study
            material. Browse subject-wise textbooks for Class 9, 10, 11, and 12 and access organized
            resources for daily study and exam preparation.
          </p>
        </header>

        <section className="mb-8">
          <p className="text-foreground/80">
            Our collection is organized by class and subject so students can quickly find the
            material they need. Whether you are revising concepts, preparing for exams, or looking
            for a textbook by subject, this page helps you reach the right section faster.
          </p>
          <p className="mt-4 text-foreground/80">
            Explore{' '}
            <Link href="/book-point/class-9" className="font-medium text-primary hover:underline">
              Class 9 books
            </Link>{' '}
            and{' '}
            <Link href="/book-point/class-10" className="font-medium text-primary hover:underline">
              Class 10 books
            </Link>
            {' easily.'}
          </p>
        </section>

        <section className="mb-12">
          <Heading2>Browse Books by Class</Heading2>

          <p className="mb-8 text-foreground/80">
            Select your class below to view available textbooks and study resources. This organized
            structure makes it easier to reach the right subject and class section without
            confusion.
          </p>

          <ul className="list-inside space-y-1 text-foreground/90">
            {classItems && classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.classId}>
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
        </section>

        <section className="mb-12">
          <Heading2>Why Use This Book Section?</Heading2>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Class-wise Organization</h3>
              <p className="text-foreground/80">
                Browse books by class level so you can quickly find relevant study material.
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
                Use textbooks and study resources to support revision and board exam preparation.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Mobile-friendly Use</h3>
              <p className="text-foreground/80">
                Access book sections easily on desktop, tablet, or mobile devices.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <Heading2>Frequently Asked Questions</Heading2>

          <div className="my-6 space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Which classes are covered?
              </h3>
              <p className="text-foreground/80">
                This section is designed for multiple classes, including 9, 10, 11, and 12, based on
                available resources.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Which subjects are available?
              </h3>
              <p className="text-foreground/80">
                Subjects may include Biology, Chemistry, Physics, Mathematics, English, Urdu, and
                more depending on class availability.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Can I use these books for exam preparation?
              </h3>
              <p className="text-foreground/80">
                Yes, class-wise books and study materials can help with revision, concept building,
                and exam preparation.
              </p>
            </div>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
