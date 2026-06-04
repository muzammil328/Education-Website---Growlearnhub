import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Heading3 } from '@muzammil328/ui';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Prepare for Board Exams: Complete Guide',
    excerpt:
      'Master your board exam preparation with these proven strategies. Learn time management, revision techniques, and stress management tips.',
    date: 'March 25, 2026',
    category: 'Exam Preparation',
    readTime: '8 min read',
    image: 'https://growlearnhub.com/blog/board-exams.webp',
    slug: 'how-to-prepare-for-board-exams',
  },
  {
    id: '2',
    title: 'Best Study Apps for Students in 2026',
    excerpt:
      'Discover the top mobile applications that can boost your productivity and help you study more effectively.',
    date: 'March 20, 2026',
    category: 'Technology',
    readTime: '5 min read',
    image: 'https://growlearnhub.com/blog/study-apps.webp',
    slug: 'best-study-apps-for-students',
  },
  {
    id: '3',
    title: 'Understanding Physics: Tips for Class 9 & 10',
    excerpt:
      "Physics doesn't have to be difficult. Learn key concepts and problem-solving approaches for success.",
    date: 'March 15, 2026',
    category: 'Science',
    readTime: '6 min read',
    image: 'https://growlearnhub.com/blog/physics-tips.webp',
    slug: 'understanding-physics-tips',
  },
  {
    id: '4',
    title: 'Mathematics Formulae You Need to Know',
    excerpt:
      'A comprehensive list of essential mathematical formulas for students from Class 9 to 12.',
    date: 'March 10, 2026',
    category: 'Mathematics',
    readTime: '10 min read',
    image: 'https://growlearnhub.com/blog/math-formulae.webp',
    slug: 'mathematics-formulae',
  },
  {
    id: '5',
    title: 'Time Management Tips for Students',
    excerpt:
      'Learn how to balance studies, extracurricular activities, and rest with effective time management.',
    date: 'March 5, 2026',
    category: 'Student Life',
    readTime: '7 min read',
    image: 'https://growlearnhub.com/blog/time-management.webp',
    slug: 'time-management-tips',
  },
  {
    id: '6',
    title: 'Chemistry Practical Tips and Tricks',
    excerpt:
      'Get ready for your chemistry practical exams with these helpful tips and common experiments.',
    date: 'February 28, 2026',
    category: 'Science',
    readTime: '6 min read',
    image: 'https://growlearnhub.com/blog/chemistry-practical.webp',
    slug: 'chemistry-practical-tips',
  },
];

const categories = [
  'All',
  'Exam Preparation',
  'Technology',
  'Science',
  'Mathematics',
  'Student Life',
];

type BlogPageProps = {
  title: string;
  image: string;
  canonical: string;
  url: string;
};

export default function BlogPage({ title, image, canonical, url }: BlogPageProps) {
  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <article className="max-w-none">
        <header className="mb-8">
          <Heading2 className="mb-2" weight="bold" size="sm">
            Blog - GrowLearnHub
          </Heading2>
          <p className="text-lg text-foreground/90">
            Welcome to the <strong>GrowLearnHub Blog</strong>, your source for study tips, exam
            preparation strategies, and educational insights. Browse our latest articles to enhance
            your learning experience.
          </p>
        </header>

        <section className="mb-8">
          <p className="text-foreground/80">
            Our blog covers a wide range of topics including mathematics, science, exam preparation,
            time management, and technology for students. Whether you are looking for study tips or
            want to stay updated with educational resources, we have you covered.
          </p>
        </section>

        <section className="mb-12">
          <Heading2>Browse by Category</Heading2>
          <div className="my-6 flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Heading2>Latest Articles</Heading2>
          <p className="mb-8 text-foreground/80">
            Explore our most recent blog posts and stay updated with the latest study tips and
            educational content.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map(post => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span className="text-4xl">📚</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <Heading3 className="mb-2 line-clamp-2" size="lg">
                    {post.title}
                  </Heading3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Heading2>Why Read Our Blog?</Heading2>
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
          <Heading2>Frequently Asked Questions</Heading2>
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
