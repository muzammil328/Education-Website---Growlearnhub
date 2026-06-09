import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PieChart from '@/components/elements/PieChart';
import PDFViewer from '@/components/elements/PDFViewer';
import Table from '@/components/elements/table';
import UnorderedList from '@/components/elements/list/UnorderedList';
import UserLayout from '@/components/layout/UserLayout';
import { getVuAdjacentCourses, getVuCourse, VU_COURSES } from '@/utils/helpers/VUHandoutsDynamic';

type Params = { course: string };

export function generateStaticParams() {
  return VU_COURSES.map(course => ({ course: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getVuCourse(courseSlug);

  if (!course) {
    return {
      title: 'VU Handout Not Found | GrowLearnHub',
      description: 'The requested handout page could not be found.',
    };
  }

  const canonical = `/vu/handouts/${course.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;

  return {
    title: course.title,
    description: course.description,
    keywords: course.keywords,
    alternates: { canonical },
    openGraph: {
      title: course.title,
      description: course.description,
      url,
      type: 'website',
      siteName: 'GrowLearnHub',
      images: [{ url: course.image, alt: course.title, width: 1200, height: 630 }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [{ url: course.image, alt: course.title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { course: courseSlug } = await params;
  const course = getVuCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const canonical = `/vu/handouts/${course.slug}/`;
  const url = `https://growlearnhub.com${canonical}`;
  const { previous, next } = getVuAdjacentCourses(course.slug);

  return (
    <UserLayout title={course.title} image={course.image} canonical={canonical} url={url}>
      <article className="max-w-none">
        <section className="mb-8">
          <p className="lead text-foreground/90">
            Download <strong>{course.code} handouts</strong> in PDF format and study at your own
            pace. This page is organized for quick access and better exam preparation.
          </p>
          <p className="text-foreground/80 mt-4">
            Visit{' '}
            <Link href="/vu/handouts" className="font-medium text-primary hover:underline">
              all VU handouts
            </Link>{' '}
            to browse more courses.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="border-b border-border py-2 text-2xl font-semibold text-primary">
            Course Overview
          </h2>
          <Table
            chapterTitleArray={[
              'Name',
              'Department',
              'Credit Hours',
              'Code',
              'Total Pages',
              'Total Chapter',
              'Mid Exam Coverage',
              'Final Exam Coverage',
            ]}
            contentArray={[
              course.name.replace(' Handouts', ''),
              course.department.toUpperCase(),
              course.creditHours || 'N/A',
              course.code,
              course.totalPages || 'N/A',
              String(course.totalChapters || 0),
              course.midCoverage || 'Course dependent',
              course.finalCoverage || 'Course dependent',
            ]}
            headingArray={['Course Title', course.code]}
          />
        </section>

        {course.slug === 'mgt211' && course.chapters ? (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary">Assessment Scheme</h2>
            <UnorderedList
              items={[
                { title: 'Assignments (4%)', description: '' },
                { title: 'Quizzes (4%)', description: '' },
                {
                  title: 'GDB (2%)',
                  description:
                    'Ability to convey ideas clearly and use effective communication strategies.',
                },
                {
                  title: 'Mid Term (30%)',
                  description: 'Includes MCQs and short-answer questions.',
                },
                { title: 'Final Term (60%)', description: '' },
              ]}
            />

            <PieChart
              labels={['GDB', 'Assignments', 'Quizzes', 'Mid Term', 'Final Term']}
              dataValues={[2, 4, 4, 30, 60]}
              bookName="MGT211"
            />
          </section>
        ) : null}

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary">Download PDF Handouts</h2>
          {course.fileId ? (
            <PDFViewer pdfUrl={course.fileId} />
          ) : (
            <p className="text-foreground/80">
              PDF is not available yet for this course. You can check other courses in the VU
              handouts section.
            </p>
          )}
        </section>

        {course.slug === 'mgt211' && course.chapters ? (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary">Topics Covered</h2>
            <Table
              chapterTitleArray={course.chapters.map(item => item.title)}
              contentArray={course.chapters.map(item => item.content)}
              chapterDATA={course.chapters.map(item => ({
                id: item.id,
                link: `#${item.title.toLowerCase().replace(/\s+/g, '-')}`,
              }))}
              headingArray={['MGT211 Chapter', 'MGT211 Topics']}
            />
          </section>
        ) : null}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary">Related Handouts</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {previous ? (
              <Link
                href={`/vu/handouts/${previous.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Previous: {previous.code}
              </Link>
            ) : null}
            <Link
              href="/vu/handouts"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              All VU Handouts
            </Link>
            {next ? (
              <Link
                href={`/vu/handouts/${next.slug}`}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Next: {next.code}
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </UserLayout>
  );
}
