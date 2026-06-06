import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import UnorderedList from '@/components/elements/list/UnorderedList';

interface Class11PageProps {
  title: string;
  image: string;
  canonical: string;
  url: string;
}

const resources = [
  { name: 'Online Test', slug: 'online-test' },
  { name: 'MCQs', slug: 'mcqs' },
  { name: 'Books', slug: 'books' },
  { name: 'Past Paper', slug: 'past-paper' },
  { name: 'Notes', slug: 'notes' },
  { name: 'Date Sheet', slug: 'date-sheet' },
  { name: 'Pairing Scheme', slug: 'pairing-scheme' },
  { name: 'Result', slug: 'result' },
];

export default function Class11Page({ title, image, canonical, url }: Class11PageProps) {
  return (
    <UserLayout title={title} image={image} canonical={canonical} url={url}>
      <p>
        Welcome to the <strong>Class 11</strong> page! Here, you&apos;ll find a comprehensive list
        of textbooks and resources that are essential for students in the 11th grade.
      </p>

      <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
        Subjects Covered for Class 11
      </h2>
      <UnorderedList
        items={[
          { description: 'Physics' },
          { description: 'Chemistry' },
          { description: 'Biology' },
          { description: 'English' },
          { description: 'Urdu' },
          { description: 'Computer Science' },
          { description: 'Math' },
          { description: 'Statistics' },
          { description: 'Economics' },
        ]}
      />

      <h2 className="py-2 text-primary border-b text-2xl font-semibold border-border">
        Quick Access Resources
      </h2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map(resource => (
          <CardSmall
            key={resource.slug}
            title={resource.name}
            link={`class-11/${resource.slug}`}
          />
        ))}
      </div>

      <h3 className="text-xl py-2 text-destructive">Online Tests for Class 11</h3>
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
      <h3 className="text-xl py-2 text-destructive">Past Papers for Class 11</h3>
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
