import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import CardSmall from '@/components/card/SmallCard';
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

type DateSheetPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default async function DateSheetPage({ title, image, canonical, url }: DateSheetPageProps) {
  const classItems = await getClassesByServiceSlug('date-sheet');

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Date Sheets – All Classes
          </Heading2>
          <p className="text-base">
            Browse class-wise date sheets for Matric, Intermediate, and other academic levels. Find
            exam schedules, subject dates, and organized date sheet sections to plan your
            preparation more effectively.
          </p>
        </header>

        <section>
          <Heading2>Class-wise Date Sheets</Heading2>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <CardSmall key={item.slug} title={item.name} link={`${item.slug}/date-sheet`} />
              ))
            ) : (
              <>
                <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
              </>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Why Date Sheets Matter</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Better planning:</strong> Organize your preparation according to the exam
              schedule
            </li>
            <li>
              <strong>Subject-wise focus:</strong> Prioritize revision based on upcoming paper dates
            </li>
            <li>
              <strong>Time management:</strong> Use the available days between exams more
              effectively
            </li>
            <li>
              <strong>Less confusion:</strong> Check your exam sequence in one place
            </li>
            <li>
              <strong>Easy access:</strong> View date sheet sections on mobile, tablet, or desktop
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">What You Can Find</h3>
          <ul className="list-inside space-y-1">
            <li>Class-wise date sheet sections</li>
            <li>Exam schedule information for different academic levels</li>
            <li>Organized access to subject-wise exam dates</li>
            <li>Helpful support for exam planning and revision</li>
            <li>Mobile-friendly browsing experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Commonly Covered Classes</h3>
          <ul className="list-inside space-y-1">
            <li>Class 9</li>
            <li>Class 10</li>
            <li>Class 11</li>
            <li>Class 12</li>
            <li>Other classes depending on availability</li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">How to Use Date Sheets</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>1. Choose your class:</strong> Select the class you are preparing for
            </li>
            <li>
              <strong>2. Open the date sheet section:</strong> Go to the relevant class page
            </li>
            <li>
              <strong>3. Check subject dates:</strong> Review the order and timing of your exams
            </li>
            <li>
              <strong>4. Make a study plan:</strong> Divide revision according to the available days
            </li>
            <li>
              <strong>5. Recheck before exams:</strong> Confirm your schedule before each paper
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
