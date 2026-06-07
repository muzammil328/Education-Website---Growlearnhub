'use client';
import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import UnorderedList from '@/components/elements/list/UnorderedList';
import { useServiceBySlug } from '@/hooks/use-public';

export default function Class10() {
  const { data: servicesData, isLoading, error } = useServiceBySlug('class-10');
  const services = servicesData?.data ?? [];

  if (isLoading) return null;
  if (error) return null;

  return (
    <UserLayout
      title="Class 10 Study Resources | Notes, MCQs, Online Tests & Past Papers"
      image="/class_10_growlearnhub.png"
      canonical="/class-10/"
      url="https://growlearnhub.com/class-10/"
    >
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
            Quick Access Resources
          </h2>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((service: { name: string; slug: string }) => (
              <CardSmall
                key={service.slug}
                title={service.name}
                link={`class-10/${service.slug}`}
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