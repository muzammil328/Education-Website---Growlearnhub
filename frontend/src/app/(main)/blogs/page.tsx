import React from 'react';
import type { Metadata } from 'next';
import BlogList from './_components/BlogList';
import UserLayout from '@/components/layout/UserLayout';

const data = {
  title: 'Blog - GrowLearnHub | Study Tips & Educational Articles',
  description:
    'Read the latest study tips, exam preparation strategies, and educational insights on the GrowLearnHub blog. Improve your learning with expert advice.',
  keywords: [
    'study tips',
    'exam preparation',
    'student blog',
    'education articles',
    'study strategies',
    'growlearnhub blog',
  ],
  image: '/blog-cover.webp',
  canonical: '/blogs/',
  url: 'https://growlearnhub.com/blogs/',
  index: true,
  follow: true,
};

export default function Page() {
  return (
    <UserLayout title={data.title} image={data.image} canonical={data.canonical} url={data.url}>
      <article className="max-w-none">
        <header className="mb-8">
          <h2>
            Blog - GrowLearnHub
          </h2>
          <p>
            Welcome to the <strong>GrowLearnHub Blog</strong>, your source for study tips, exam
            preparation strategies, and educational insights. Browse our latest articles to enhance
            your learning experience.
          </p>
        </header>

        <section className="mb-8">
          <p>
            Our blog covers a wide range of topics including mathematics, science, exam preparation,
            time management, and technology for students. Whether you are looking for study tips or
            want to stay updated with educational resources, we have you covered.
          </p>
        </section>
        <BlogList />

        <section className="mb-12">
          <h3>Why Read Our Blog?</h3>
          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Expert Advice</h3>
              <p className="text-foreground/80">
                Get study tips and exam preparation strategies from experienced educators.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Latest Updates</h3>
              <p className="text-foreground/80">
                Stay informed about new study materials, syllabus changes, and educational
                resources.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Practical Tips</h3>
              <p className="text-foreground/80">
                Learn actionable techniques you can immediately apply to your studies.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">All Levels Covered</h3>
              <p className="text-foreground/80">
                Content tailored for students from Class 9 to university level.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3>Frequently Asked Questions</h3>
          <div className="my-8 space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                How often is the blog updated?
              </h3>
              <p className="text-foreground/80">
                We publish new articles every week, covering various topics related to education and
                student life.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Can I request specific topics?
              </h3>
              <p className="text-foreground/80">
                Yes! You can use our contact form to suggest topics you would like us to cover in
                future blog posts.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Are the articles free to read?
              </h3>
              <p className="text-foreground/80">
                Yes, all blog posts on GrowLearnHub are completely free to access and read.
              </p>
            </div>
          </div>
        </section>
      </article>
    </UserLayout>
  );
}

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    type: 'website',
    images: [
      {
        url: data.image,
        alt: data.title,
      },
    ],
  },
  alternates: {
    canonical: data.canonical,
  },
  robots: {
    index: data.index,
    follow: data.follow,
    googleBot: {
      index: data.index,
      follow: data.follow,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.image],
  },
};
