import type { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2 } from '@muzammil328/ui';
import { removeDashAndUppercase } from '@/lib/removeDashAndUppercase';
import { config } from '@/config';
import Class9McqsHeadingPage from '@/features/McqsPage/Class9/Heading';

interface PageProps {
  params: Promise<{ subject: string; chapter: string; Heading: string }>;
}

const CLASS_SLUG = 'class-9';
const image = '/9th/class_9_mcqs.webp';

function buildData(subject: string, chapter: string, heading: string) {
  const subjectLabel = removeDashAndUppercase(subject);
  const chapterLabel = removeDashAndUppercase(chapter);
  const headingLabel = removeDashAndUppercase(heading);

  return {
    title: `Class 9 ${subjectLabel} ${chapterLabel} ${headingLabel} Topics`,
    description: `Explore sub-topics in Class 9 ${subjectLabel} ${chapterLabel} ${headingLabel} and continue to topic-specific MCQs.`,
    keywords: [`Class 9 ${subjectLabel} ${chapterLabel} ${headingLabel} topics`, `${headingLabel} MCQs for Class 9`],
    canonical: `/${CLASS_SLUG}/mcqs/${subject}/${chapter}/${heading}/`,
    url: `${config.SITE_URL}/${CLASS_SLUG}/mcqs/${subject}/${chapter}/${heading}/`,
    image,
  };
}

export const revalidate = 432000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, chapter, Heading } = await params;
  const data = buildData(subject, chapter, Heading);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: data.canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url,
      images: [{ url: data.image, alt: data.title }],
    },
    twitter: {
      title: data.title,
      description: data.description,
      images: { url: data.image, alt: data.title },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { subject, chapter, Heading } = await params;
  const data = buildData(subject, chapter, Heading);
  const subjectLabel = removeDashAndUppercase(subject);
  const chapterLabel = removeDashAndUppercase(chapter);
  const headingLabel = removeDashAndUppercase(Heading);

  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="space-y-8">
        <header className="space-y-3">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Class 9 {subjectLabel} {chapterLabel} {headingLabel} Topics
          </Heading2>
          <p className="text-base">
            Move from headings into the sub-topic hierarchy for {headingLabel}.
          </p>
        </header>
        <Class9McqsHeadingPage bookSlug={subject} chapterSlug={chapter} headingSlug={Heading} />
      </article>
    </UserLayout>
  );
}
