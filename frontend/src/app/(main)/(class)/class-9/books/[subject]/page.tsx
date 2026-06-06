import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { generatePageMetadata } from '@/lib/seo';
import { config } from '@/config';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { BookWithMediums } from '@/types/book.types';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';

export const revalidate = 604800; // 7 days in seconds

const CLASS_SLUG = 'class-9';

async function getBookBySlug(slug: string) {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.book.getAll.query({ 
      status: 'active',
      page: 1,
      limit: 100 
    });
    
    return (result?.data || []).find((b: any) => b.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { board: string };
}): Promise<Metadata> {
  const book = await getBookBySlug(params.board);

  if (!book) {
    return {
      title: 'Class 9 Book Not Found | GrowLearnHub',
      description: 'Requested Class 9 book could not be found.',
    };
  }

  const bookName = removeDashAndUppercase(params.board);
  const canonical = `/class-9/books/${params.board}/`;
  const title = `${bookName} Class 9 Book PDF | Punjab Board`;
  const description = `${bookName} Class 9 textbook with English and Urdu medium options. Read online or choose your preferred medium for chapter-wise navigation.`;

  return generatePageMetadata({
    title,
    description,
    canonical,
    keywords: [
      `${bookName.toLowerCase()} class 9 book pdf`,
      `punjab board class 9 ${bookName.toLowerCase()} book`,
      `class 9 ${bookName.toLowerCase()} textbook`,
      'class 9 books pdf',
      'growlearnhub class 9 books',
    ],
    image: '/9th/class_9_book_growlearnhub.png',
  });
}

export default async function Page({ params }: { params: { board: string } }) {
  const book = await getBookBySlug(params.board);

  if (!book) {
    notFound();
  }

  const bookName = removeDashAndUppercase(params.board);
  const canonical = `/class-9/books/${params.board}/`;
  const url = `https://growlearnhub.com${canonical}`;

  return (
    <UserLayout
      title={`${bookName} Class 9 Book PDF`}
      image="/9th/class_9_book_growlearnhub.png"
      canonical={canonical}
      url={url}
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Access <strong>{bookName}</strong> Class 9 textbook. Choose your preferred medium below
            to open the complete book with chapter-wise navigation.
          </p>
          <p className="text-foreground/80 mt-4">
            You can also return to{' '}
            <Link href="/class-9/books" className="font-medium text-primary hover:underline">
              Class 9 books list
            </Link>{' '}
            to explore other subjects.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Select Medium
          </h2>
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {book.mediums.map(medium => (
              <CardSmall
                key={medium.mediumId || medium.slug}
                title={`${bookName} ${medium.name}`}
                link={`class-9/books/${book.slug}/${medium.slug}`}
              />
            ))}
          </div>
        </section>

        {book.chapters && book.chapters.length > 0 && (
          <section className="mb-10">
            <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
              All Chapters
            </h2>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {book.chapters.map(chapter => (
                <CardSmall
                  key={chapter.chapterId}
                  title={chapter.name}
                  link={`class-9/books/${book.slug}/${chapter.mediumId || 'english-medium'}/${chapter.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </UserLayout>
  );
}
