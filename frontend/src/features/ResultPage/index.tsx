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

export default async function ResultPage({ title, image, canonical, url }: UserLayoutProps) {
  const classItems = await getClassesByServiceSlug('result');
  console.log('Classes associated with "result" service:', classItems);

  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="">
        <header className="mb-8">
          <Heading2 className="" size="lg">
            Results – All Classes
          </Heading2>
          <p className="text-base">
            Browse class-wise exam results for Matric, Intermediate, and other academic levels.
            Select your class to view the latest result updates, board links, and result-related
            information in one place.
          </p>
        </header>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">What You Can Find Here</h3>
          <ul className="list-inside space-y-2">
            <li>
              <strong>Class-wise result pages:</strong> Quickly open results for your selected class
            </li>
            <li>
              <strong>Latest updates:</strong> Stay informed about announced and upcoming results
            </li>
            <li>
              <strong>Board and exam information:</strong> Access relevant result details in one
              place
            </li>
            <li>
              <strong>Easy navigation:</strong> Move directly to the class you are looking for
            </li>
            <li>
              <strong>Mobile-friendly access:</strong> Check results easily from phone, tablet, or
              desktop
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Available Categories</h3>
          <ul className="list-inside space-y-1">
            {classItems.length > 0 ? (
              classItems.map(item => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/result`} className="text-primary hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>Matric / SSC</li>
                <li>Intermediate / HSSC</li>
                <li>Other academic classes and result sections</li>
              </>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">Why Use This Page</h3>
          <ul className="list-inside space-y-1">
            <li>Find your result section faster</li>
            <li>Reduce confusion between different classes and boards</li>
            <li>Access organized result pages from one central location</li>
            <li>Stay updated with current result announcements</li>
          </ul>
        </section>

        <section className="border-t pt-6">
          <h3 className="mb-3 text-lg font-semibold">How to Check Your Result</h3>
          <ol className="list-inside space-y-2">
            <li>
              <strong>Choose your class:</strong> Select the relevant class from the list above
            </li>
            <li>
              <strong>Open the result page:</strong> Go to the page for your class or category
            </li>
            <li>
              <strong>Follow the provided method:</strong> Check the result using the available
              board or exam process
            </li>
            <li>
              <strong>Verify your details:</strong> Make sure your roll number, name, or exam
              session is correct
            </li>
            <li>
              <strong>Save your result:</strong> Download or print it if that option is available
            </li>
          </ol>
        </section>
      </article>
    </UserLayout>
  );
}
