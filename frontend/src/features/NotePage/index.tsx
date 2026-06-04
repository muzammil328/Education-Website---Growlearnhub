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

export default async function NotesPage({ title, image, canonical, url }: UserLayoutProps) {
  const classItems = await getClassesByServiceSlug('notes');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Notes – All Classes
          </Heading2>
          <p className="text-base">
            Browse class-wise notes for Matric, Intermediate, and other academic levels. Find
            subject-wise study material, chapter summaries, and concept-focused notes to support
            better exam preparation.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Available Categories</h3>
          <ul className="list-inside space-y-1">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/notes`} className="text-primary hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>Matric / SSC</li>
                <li>Intermediate / HSSC</li>
                <li>Other academic classes and notes sections</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Benefits of Notes</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Quick revision:</strong> Review important topics in a shorter and clearer
              format
            </li>
            <li>
              <strong>Concept clarity:</strong> Understand key ideas without going through full
              textbooks every time
            </li>
            <li>
              <strong>Chapter-wise study:</strong> Focus on one topic at a time for better learning
            </li>
            <li>
              <strong>Exam preparation:</strong> Use concise material to revise before tests and
              board exams
            </li>
            <li>
              <strong>Easy access:</strong> Study anytime on mobile, tablet, or desktop
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">What You Can Find</h3>
          <ul className="list-inside space-y-1">
            <li>Class-wise notes collections</li>
            <li>Chapter-wise summaries and explanations</li>
            <li>Subject-wise study material</li>
            <li>Helpful revision content for exam preparation</li>
            <li>Mobile-friendly reading experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Subjects Available</h3>
          <ul className="list-inside space-y-1">
            <li>Biology</li>
            <li>Chemistry</li>
            <li>Physics</li>
            <li>And other subjects depending on class availability</li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">How to Use Notes</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your class:</strong> Select the class you want to study
            </li>
            <li>
              <strong>2. Pick a subject:</strong> Open the subject you need help with
            </li>
            <li>
              <strong>3. Study chapter-wise:</strong> Read notes topic by topic
            </li>
            <li>
              <strong>4. Revise key concepts:</strong> Focus on definitions, formulas, and important
              points
            </li>
            <li>
              <strong>5. Prepare for exams:</strong> Use notes for quick revision before tests
            </li>
            <li>
              <strong>6. Repeat regularly:</strong> Revisit notes to strengthen understanding
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
