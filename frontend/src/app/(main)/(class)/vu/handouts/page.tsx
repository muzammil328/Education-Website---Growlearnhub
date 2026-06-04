import type { Metadata } from 'next';
import CardSmall from '@/components/card/SmallCard';
import UserLayout from '@/components/layout/UserLayout';
import { VU_COURSES_BY_DEPARTMENT } from '@/utils/helpers/VUHandoutsDynamic';

const data = {
  title: 'VU Handouts PDF Download | All Virtual University Courses - GrowLearnHub',
  description:
    'Download Virtual University handouts in PDF format for CS, MTH, ENG, EDU, and other courses. Access organized course-wise notes for exam preparation.',
  keywords: [
    'vu handouts pdf',
    'virtual university handouts',
    'vu course handouts',
    'cs handouts vu',
    'mth handouts vu',
    'growlearnhub vu handouts',
  ],
  image: '/vu/vu_handouts.webp',
  canonical: '/vu/handouts/',
  url: 'https://growlearnhub.com/vu/handouts/',
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Browse and download <strong>Virtual University handouts</strong> by course code. All
            courses are grouped by department so you can find study material quickly.
          </p>
        </section>

        {VU_COURSES_BY_DEPARTMENT.map(group => (
          <section key={group.department} className="mb-12">
            <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
              {group.label} Handouts
            </h2>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {group.courses.map(course => (
                <CardSmall
                  key={course.slug}
                  title={`${course.code} Handouts`}
                  link={`vu/handouts/${course.slug}`}
                />
              ))}
            </div>
          </section>
        ))}
      </article>
    </UserLayout>
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  alternates: { canonical: data.canonical },
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    type: 'website',
    siteName: 'GrowLearnHub',
    images: [{ url: data.image, alt: 'Virtual University handouts PDF', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [{ url: data.image, alt: 'VU handouts PDF' }],
  },
};
