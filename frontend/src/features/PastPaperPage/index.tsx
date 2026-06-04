import React from 'react';
import Link from 'next/link';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

type ResultClassItem = {
  name: string;
  slug: string;
};

async function getClassesByServiceSlug(serviceSlug: string): Promise<ResultClassItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.class.getByServiceSlug.query({ serviceSlug });
    return result || [];
  } catch {
    return [];
  }
}

export default async function PastPaperPage({ title, image, canonical, url }: UserLayoutProps) {
  const classItems = await getClassesByServiceSlug('past-paper');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Past Papers – All Classes
          </Heading2>
          <p className="text-base">
            Prepare more effectively with class-wise past papers for Matric, Intermediate, and other
            academic levels. Browse your class to find subject-wise past papers and practice with
            real exam-style questions.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Available Categories</h3>
          <ul className="list-inside space-y-1">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/past-paper`} className="text-primary hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>Matric / SSC</li>
                <li>Intermediate / HSSC</li>
                <li>Other academic classes and past paper sections</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Benefits of Past Papers</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Exam pattern familiarity:</strong> Understand the structure and style of real
              exam questions
            </li>
            <li>
              <strong>Better preparation:</strong> Practice important topics that appear repeatedly
            </li>
            <li>
              <strong>Time management:</strong> Improve speed and accuracy under exam conditions
            </li>
            <li>
              <strong>Confidence building:</strong> Reduce exam stress through targeted practice
            </li>
            <li>
              <strong>Focused revision:</strong> Identify weak areas and revise smarter
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">What You Can Find</h3>
          <ul className="list-inside space-y-1">
            <li>Class-wise past paper collections</li>
            <li>Subject-wise paper access</li>
            <li>Practice material for board exam preparation</li>
            <li>Multiple years and exam formats where available</li>
            <li>Mobile-friendly browsing experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Subjects Available</h3>
          <ul className="list-inside space-y-1">
            <li>Biology</li>
            <li>Chemistry</li>
            <li>Physics</li>
            <li>And other subjects depending on class and board</li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">How to Use Past Papers</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your class:</strong> Select the class you want to prepare for
            </li>
            <li>
              <strong>2. Pick a subject:</strong> Open the subject you want to practice
            </li>
            <li>
              <strong>3. Select a paper:</strong> Choose the available year or exam paper
            </li>
            <li>
              <strong>4. Practice seriously:</strong> Attempt questions like a real exam
            </li>
            <li>
              <strong>5. Review your work:</strong> Check where you need improvement
            </li>
            <li>
              <strong>6. Repeat regularly:</strong> Use past papers for revision before exams
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
