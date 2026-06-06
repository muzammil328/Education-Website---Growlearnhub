import React from 'react';
import Link from 'next/link';
import { Heading2 } from '@muzammil328/ui';
import CardSmall from '@/components/card/SmallCard';
import UserLayout, { UserLayoutProps } from '@/components/layout/UserLayout';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

type ResultClassItem = {
  name: string;
  slug: string;
};

type BookItem = {
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

async function getBooksByClassName(className: string): Promise<BookItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.book.getByClassName.query({ className });
    return result || [];
  } catch {
    return [];
  }
}

export default async function OnlineTestPage({ title, image, canonical, url }: UserLayoutProps) {
  const classItems = await getClassesByServiceSlug('online-test');

  const booksByClass = await Promise.all(classItems.map(item => getBooksByClassName(item.name)));
  const subjects = booksByClass.flat();

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Online Tests – All Classes
          </Heading2>
          <p className="text-base">
            Practice with interactive online tests for multiple classes and subjects. Improve your
            preparation through chapter-wise quizzes, instant feedback, and performance-based
            learning.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Available Categories</h3>
          <ul className="list-inside space-y-1">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/online-test`} className="text-primary hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>Matric / SSC</li>
                <li>Intermediate / HSSC</li>
                <li>Other academic classes and online test sections</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <Heading2>Subjects Wise Online Test</Heading2>
          {subjects.length > 0 ? (
            <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {subjects.map(subject => (
                <CardSmall
                  key={subject.slug || subject.name}
                  title={subject.name}
                  link={`online-test/${subject.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No subjects available</p>
          )}
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Benefits of Online Testing</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Instant results:</strong> Check your score immediately after completing a test
            </li>
            <li>
              <strong>Quick feedback:</strong> Learn from mistakes and improve weak areas
            </li>
            <li>
              <strong>Better practice:</strong> Strengthen concepts with repeated testing
            </li>
            <li>
              <strong>Time management:</strong> Build speed and confidence for real exams
            </li>
            <li>
              <strong>Easy access:</strong> Practice anytime on mobile, tablet, or desktop
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Test Features</h3>
          <ul className="list-inside space-y-1">
            <li>Class-wise and subject-wise test access</li>
            <li>Chapter-wise quizzes for focused practice</li>
            <li>Instant answer review</li>
            <li>Timed and untimed test options</li>
            <li>Simple and mobile-friendly interface</li>
            <li>Helpful practice for exam preparation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Subjects Available</h3>
          <ul className="list-inside space-y-1">
            <li>Biology</li>
            <li>Chemistry</li>
            <li>Physics</li>
            <li>Additional subjects based on class availability</li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">How to Get Started</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your class:</strong> Start from the class-wise section
            </li>
            <li>
              <strong>2. Select a subject:</strong> Pick the subject you want to practice
            </li>
            <li>
              <strong>3. Open a test:</strong> Choose the chapter or test type available
            </li>
            <li>
              <strong>4. Attempt the questions:</strong> Complete the test carefully
            </li>
            <li>
              <strong>5. Review your result:</strong> Check your performance and mistakes
            </li>
            <li>
              <strong>6. Practice again:</strong> Repeat tests to improve accuracy and confidence
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
