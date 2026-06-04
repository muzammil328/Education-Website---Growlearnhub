import { Metadata } from 'next';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { generatePageMetadata } from '@/lib/seo';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

interface BookItem {
  name: string;
  slug: string;
}

async function getBooks(): Promise<BookItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.book.getByClassName.query({ className: CLASS_SLUG });
    return result || [];
  } catch {
    return [];
  }
}

const CLASS_SLUG = 'class-12';
const CLASS_DISPLAY = '12';

interface BookItem {
  name: string;
  slug: string;
}

const data = {
  title: `Class ${CLASS_DISPLAY} Books PDF Download | Subject-Wise 12th Class Textbooks`,
  description: `Download free Class ${CLASS_DISPLAY} books in PDF format with subject-wise coverage. Access Biology, Chemistry, Physics, Math, English, Urdu, Computer Science, and more for exam preparation.`,
  keywords: [
    'Class 12 books',
    '12th class textbooks',
    'Class 12 free PDF books',
    '12th class study guides',
    'GrowLearnHub Class 12 books',
    'Class 12 subject-wise books',
    'Download Class 12 textbooks',
    'Class 12 Biology book pdf',
    'Class 12 Physics book pdf',
    'Class 12 Chemistry book pdf',
    'Class 12 Math book pdf',
    'Punjab board class 12 books',
  ],
  image: '/12th/class_12_book.webp',
  canonical: '/class-12/books/',
  url: 'https://growlearnhub.com/class-12/books/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

export default async function Page() {
  const books = await getBooks();

  return (
    <UserLayout
      title={metadata.title as string}
      image="/12th/class_12_book_growlearnhub.png"
      canonical="/class-12/books/"
      url="https://growlearnhub.com/class-12/books/"
    >
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Get complete <strong>Class {CLASS_DISPLAY} books in PDF</strong> for all major subjects
            in one place. This page helps students quickly access textbook resources for daily
            study, assignments, and annual exam preparation.
          </p>
          <p className="text-foreground/80 mt-4">
            Looking for other grades too? Visit{' '}
            <Link href="/class-9/books" className="font-medium text-primary hover:underline">
              Class 9 books
            </Link>{' '}
            and{' '}
            <Link href="/class-10/books" className="font-medium text-primary hover:underline">
              Class 10 books
            </Link>{' '}
            and{' '}
            <Link href="/class-11/books" className="font-medium text-primary hover:underline">
              Class 11 books
            </Link>{' '}
            for more subject-wise textbook collections.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Available Subjects for Class {CLASS_DISPLAY} Books
          </h2>
          <p className="text-foreground/80 mt-4">
            Browse the subjects below and open the book page you need. Each subject offers English
            and Urdu medium options with chapter-wise navigation.
          </p>

          {books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
              {books.map(book => (
                <CardSmall
                  key={book.slug}
                  title={book.name}
                  link={`${CLASS_SLUG}/books/${book.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 mt-4">No books available at the moment.</p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary">
            How to Use These Class {CLASS_DISPLAY} Books
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-foreground/80 mt-4">
            <li>Select your subject from the cards above.</li>
            <li>Choose your preferred medium (English or Urdu).</li>
            <li>Open the book page and choose the chapter you want to study.</li>
            <li>Read online or download the PDF for offline revision.</li>
            <li>Use these books regularly for tests, homework, and final exam practice.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary">Why Students Use GrowLearnHub</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-4">
            <li>Subject-wise organization for faster navigation</li>
            <li>Free access to Class {CLASS_DISPLAY} textbook resources</li>
            <li>Useful for school study and board exam preparation</li>
            <li>Simple structure for mobile and desktop users</li>
          </ul>
        </section>
      </article>
    </UserLayout>
  );
}
