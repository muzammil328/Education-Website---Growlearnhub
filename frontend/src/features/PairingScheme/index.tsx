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

export default async function PairingSchemePage({ title, image, canonical, url }: UserLayoutProps) {
  const classItems = await getClassesByServiceSlug('pairing-scheme');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Pairing Schemes – All Classes
          </Heading2>
          <p className="text-base">
            Browse class-wise pairing schemes to understand paper patterns, important units, and
            question distribution for board exam preparation. Select your class to explore the
            relevant subject-wise pairing scheme sections.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Available Categories</h3>
          <ul className="list-inside space-y-1">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}/pairing-scheme`}
                    className="text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>Matric / SSC</li>
                <li>Intermediate / HSSC</li>
                <li>Other academic classes and pairing scheme sections</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Benefits of Pairing Schemes</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Smart preparation:</strong> Focus on the chapters and sections that matter
              most in exams
            </li>
            <li>
              <strong>Paper pattern understanding:</strong> Learn how objective, short, and long
              questions are distributed
            </li>
            <li>
              <strong>Better revision planning:</strong> Organize your study time more effectively
            </li>
            <li>
              <strong>Confidence before exams:</strong> Prepare with a clearer idea of what to
              expect
            </li>
            <li>
              <strong>Subject-wise guidance:</strong> Review pairing details for each subject where
              available
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">What You Can Find</h3>
          <ul className="list-inside space-y-1">
            <li>Class-wise pairing scheme sections</li>
            <li>Subject-wise paper pattern information</li>
            <li>Support for board exam preparation</li>
            <li>Organized access for different academic levels</li>
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
          <h3 className="mb-3 text-lg font-semibold">How to Use Pairing Schemes</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your class:</strong> Select the class you are preparing for
            </li>
            <li>
              <strong>2. Open the subject:</strong> Go to the subject you want to study
            </li>
            <li>
              <strong>3. Review the pattern:</strong> Check question distribution and important
              areas
            </li>
            <li>
              <strong>4. Plan your study:</strong> Divide your preparation according to the scheme
            </li>
            <li>
              <strong>5. Practice accordingly:</strong> Use the scheme with notes, past papers, and
              revision
            </li>
            <li>
              <strong>6. Revise before exams:</strong> Focus on the most relevant topics and
              question types
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
