'use client';
import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useServiceByClassSlug } from '@/hooks/use-public';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Heading2, Heading3, Para } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function VU({ children }: { children?: React.ReactNode }) {
  const { data: servicesData, isLoading, error } = useServiceByClassSlug('vu');
  const services = servicesData?.data ?? [];

  return (
    <UserLayout
      title="Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub"
      image="/vu.webp"
      canonical="/vu/"
      url="https://growlearnhub.com/vu/"
    >
      <Para>
        Welcome to the <strong className="font-semibold text-foreground">Virtual University</strong> study
        hub — your one-stop destination for free handouts, MCQs, past papers, and midterm &amp; final
        term exam guides for all VU semesters and courses.
      </Para>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && services.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {services.map((service: { name: string; slug: string }) => (
            <CardSmall
              key={service.slug}
              title={service.name}
              link={`vu/${service.slug}`}
            />
          ))}
        </div>
      )}

      {children}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <Heading2>Virtual University Study Resources — Complete Guide for VU Students</Heading2>
        <Para>
          Studying at Virtual University does not have to be a solo struggle. GrowLearnHub brings
          together <strong className="text-foreground">free VU handouts</strong>, chapter-wise MCQs,
          midterm and final term past papers, and exam guides for courses across all semesters.
          Whether you are preparing for CS, Business, or Education programmes, you will find
          everything you need right here — no signup required.
        </Para>

        <Heading2>VU Handouts &amp; Lecture Notes — All Courses</Heading2>
        <Para>
          Our VU study notes summarise key concepts from official handouts in simple, scannable
          language. Each course is organised by topic so you can jump straight to the chapter you
          need. Important definitions, formulas, and diagrams are highlighted to help you revise
          faster in the days before your midterm or final exam.
        </Para>

        <Heading2>Chapter-wise MCQs for VU Courses</Heading2>
        <Para>
          VU quizzes and exams rely heavily on MCQs. Our
          chapter-wise <strong className="text-foreground">VU MCQs</strong> are sourced from
          past papers, Waqar Siddhu files, and model papers so you practice exactly what appears
          in real assessments. Each question includes the correct answer and a short explanation
          to make self-study effective.
        </Para>

        <Heading2>VU Midterm &amp; Final Term Past Papers</Heading2>
        <Para>
          Past papers are the most reliable guide to what will appear in your next VU exam.
          Our <strong className="text-foreground">VU past papers</strong> are organised by course
          code and semester — midterm and final term — going back multiple years. Download and
          practise them to get comfortable with question patterns and timing before exam day.
        </Para>

        <Heading2>VU GPA Calculator &amp; Exam Guides</Heading2>
        <Para>
          Not sure what marks you need to pass your final? Use our built-in VU GPA and percentage
          calculators to plan your target scores across quizzes, assignments, midterm, and final
          term. Our exam guides also break down the marking scheme so you know exactly where to
          focus your effort.
        </Para>

        <Heading3>Frequently Asked Questions</Heading3>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              value: 'faq-1',
              q: 'Are the VU study resources on GrowLearnHub free?',
              a: 'Yes, all handouts, MCQs, past papers, and exam guides on GrowLearnHub are completely free. No account or payment is required.',
            },
            {
              value: 'faq-2',
              q: 'Which VU courses are covered?',
              a: 'We cover a wide range of VU courses including CS, IT, Business, MBA, Education, and more. Search by course code to find your specific subject.',
            },
            {
              value: 'faq-3',
              q: 'Are both midterm and final term past papers available?',
              a: 'Yes. Past papers for both midterm and final term exams are available for most courses, going back several semesters.',
            },
            {
              value: 'faq-4',
              q: 'Can I use GrowLearnHub on mobile?',
              a: 'Yes. The entire platform is fully responsive and works on any smartphone or tablet browser.',
            },
          ].map(({ value, q, a }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-sm font-semibold text-foreground">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </UserLayout>
  );
}
