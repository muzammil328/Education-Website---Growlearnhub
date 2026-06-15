import React from 'react';
import BlogCard from '@/components/card/BlogCard';
import { Heading2, Para } from '@muzammil328/ui';

export interface BlogPost {
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

// const categories = [
//   'All',
//   'Exam Preparation',
//   'Technology',
//   'Science',
//   'Mathematics',
//   'Student Life',
// ];

export default function BlogList() {
  return (
    <section className="mb-12">
      <Heading2 className="mb-4 text-2xl font-bold">Latest Articles</Heading2>
      <Para className="mb-8 text-foreground/80">
        Explore our most recent blog posts and stay updated with the latest study tips and
        educational content.
      </Para>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map(post => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}
