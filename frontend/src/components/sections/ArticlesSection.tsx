import React from 'react';
import Link from 'next/link';

type TagPosition = 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';

const articles = [
  {
    id: 1,
    image: '/class_9_growlearnhub.png',
    tag: 'Class 9',
    tagPosition: 'top-right' as TagPosition,
    title: 'Everything You Need for Class 9 Board Exams',
    description:
      'Chapter-wise notes, past-paper MCQs, timed online tests, and past papers — all organised for Punjab Board, Federal Board, and every BISE board.',
    href: '/class-9/',
  },
  {
    id: 2,
    image: '/mcqs-point.webp',
    tag: 'MCQ Practice',
    tagPosition: 'bottom-left' as TagPosition,
    title: 'How to Score Full Marks in MCQs — A Proven Strategy',
    description:
      'Practise past-paper MCQs chapter by chapter with instant correct answers and short explanations. Build speed and accuracy before your board exam.',
    href: '/class-10/',
  },
  {
    id: 3,
    image: '/explore_topics.webp',
    tag: 'Past Papers',
    tagPosition: 'top-right' as TagPosition,
    title: 'Five-Plus Years of Past Papers — Free for Every Board',
    description:
      'Download or read past papers for every major Pakistani board. Revision made simple — one platform, all boards, completely free.',
    href: '/class-11/',
  },
];

function ArticleCard({
  image,
  tag,
  tagPosition,
  title,
  description,
  href,
}: (typeof articles)[0]) {
  const badgePos =
    tagPosition === 'top-right'
      ? 'top-3 right-3'
      : tagPosition === 'bottom-left'
        ? 'bottom-3 left-3'
        : tagPosition === 'top-left'
          ? 'top-3 left-3'
          : 'bottom-3 right-3';

  return (
    <Link href={href} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute ${badgePos} rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm`}
        >
          {tag}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

export function ArticlesSection() {
  return (
    <section className="border-b border-border bg-background px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            Study guides &amp; resources
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Practical tips, strategies, and free resources to help you ace your board exams.
          </p>
        </div>

        {/* card grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map(article => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>

        {/* see more */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs/"
            className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            See More
          </Link>
        </div>

      </div>
    </section>
  );
}
