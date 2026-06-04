import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import UnorderedList from '@/components/elements/list/UnorderedList';
import { generatePageMetadata } from '@/lib/seo';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend-trpc/router';
import { config } from '@/config';

export const revalidate = 604800; // 7 days in seconds

const CLASS_SLUG = 'class-10';

interface BookItem {
  name: string;
  slug: string;
}

interface ServiceItem {
  serviceId: string;
  name: string;
  slug: string;
}

interface ResourceItem {
  name: string;
  slug: string;
}

const data = {
  title: 'Class 10 Study Resources | Notes, MCQs, Online Tests & Past Papers',
  description:
    'Access Class 10 notes, chapter-wise MCQs, online tests, past papers, date sheets, and result updates for smart exam preparation.',
  image: '/class_10_growlearnhub.png',
  keywords: [
    'Class 10 study material',
    '10th class notes',
    'Class 10 MCQs',
    'Class 10 online test',
    '10th class past papers',
    'Class 10 books',
    'GrowLearnHub Class 10',
  ],
  canonical: '/class-10/',
  url: 'https://growlearnhub.com/class-10/',
  index: true,
  follow: true,
};

export const metadata: Metadata = generatePageMetadata(data);

async function getResources(): Promise<ResourceItem[]> {
  return [
    { name: 'Online Test', slug: 'online-test' },
    { name: 'MCQs', slug: 'mcqs' },
    { name: 'Books', slug: 'books' },
    { name: 'Past Paper', slug: 'past-paper' },
    { name: 'Notes', slug: 'notes' },
    { name: 'Date Sheet', slug: 'date-sheet' },
    { name: 'Pairing Scheme', slug: 'pairing-scheme' },
    { name: 'Result', slug: 'result' },
  ];
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

async function getServices(): Promise<ServiceItem[]> {
  try {
    const trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.API_URL ?? ''}/trpc`,
        }),
      ],
    });

    const result = await trpcClient.class.getByServiceSlug.query({ serviceSlug: CLASS_SLUG });
    return result || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [resources, books, services] = await Promise.all([
    getResources(),
    getBooks(),
    getServices(),
  ]);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <p>
        Welcome to the <strong>Class 10</strong> page! Here, you&apos;ll find a comprehensive list
        of textbooks and resources that are essential for students in the 10th grade.
      </p>

      <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
        Subjects Covered for Class 10
      </h2>
      <UnorderedList
        items={[
          { description: 'Physics' },
          { description: 'Chemistry' },
          { description: 'Biology' },
          { description: 'English' },
          { description: 'Urdu' },
          { description: 'Computer Science' },
          { description: 'Economics' },
          { description: 'Math' },
          { description: 'General Knowledge' },
          { description: 'Ikhlaqiat' },
          { description: 'Islamiyat' },
          { description: 'Pak Study' },
          { description: 'Tarjuma Tul Quran' },
        ]}
      />

      {services.length > 0 && (
        <>
          <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
            Our Services
          </h2>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map(service => (
              <CardSmall
                key={service.serviceId}
                title={service.name}
                link={`/services/${service.slug}`}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
        Quick Access Resources
      </h2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map(resource => (
          <CardSmall
            key={resource.slug}
            title={resource.name}
            link={`${CLASS_SLUG}/${resource.slug}`}
          />
        ))}
      </div>

      {books.length > 0 && (
        <>
          <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
            Textbooks
          </h2>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {books.map(book => (
              <CardSmall
                key={book.slug}
                title={book.name}
                link={`${CLASS_SLUG}/books/${book.slug}`}
              />
            ))}
          </div>
        </>
      )}

      <h3 className="text-xl py-2 text-destructive">Online Tests for Class 10</h3>
      <p>
        In the current digital age Online testers have become a popular tool for students to assess
        their understanding and readiness. These tests provide a flexible platform for students to
        practice and assess their knowledge in various subjects.
      </p>
      <UnorderedList
        items={[
          {
            title: 'Convenience',
            description: 'Students can take the test from home according to their needs.',
          },
          {
            title: 'Instant Feedback',
            description: 'Instant grading helps students identify their strengths and weaknesses.',
          },
          {
            title: 'Variety of Questions',
            description:
              'Exposure to different target formats and difficulty levels will improve preparation.',
          },
        ]}
      />
      <h3 className="text-xl py-2 text-destructive">Past Papers for Class 10</h3>
      <p>
        Past papers are an invaluable resources for students preparing for exams. It provides
        insights into the types of questions being asked, the exam format and the marking scheme.
      </p>
      <UnorderedList
        items={[
          {
            title: 'Knowledge of exam format',
            description:
              'Understanding the layout and structure of the exam which can reduces anxiety.',
          },
          {
            title: 'Time Management Skills',
            description:
              'Practicing past papers helps students learn to manage their time effectively during exams.',
          },
          {
            title: 'Identifying Important Topics',
            description:
              'Past papers often highlight frequently tested concepts, guiding study focus.',
          },
        ]}
      />
    </UserLayout>
  );
}
