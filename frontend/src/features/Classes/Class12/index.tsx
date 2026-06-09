'use client';
import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useServiceByClassSlug } from '@/hooks/use-public';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@muzammil328/ui';
import { SmallCardSkeletonGrid } from '@/components/skeleton/SmallCardSkeleton';

export default function Class12({ children }: { children?: React.ReactNode }) {
  const { data: servicesData, isLoading, error } = useServiceByClassSlug('class-12');
  const services = servicesData?.data ?? [];

  return (
    <UserLayout
      title="Class 12 Study Resources | Notes, MCQs, Online Tests & Past Papers"
      image="/class_12_growlearnhub.png"
      canonical="/class-12/"
      url="https://growlearnhub.com/class-12/"
    >
      <p>
        Welcome to the <strong className="font-semibold text-foreground">Class 12</strong> study
        hub — your one-stop destination for free notes, MCQs, online tests, and past papers
        for all subjects across Punjab, Federal, and BISE boards.
      </p>

      {isLoading && <SmallCardSkeletonGrid />}
      {!isLoading && !error && services.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
          {services.map((service: { name: string; slug: string }) => (
            <CardSmall
              key={service.slug}
              title={service.name}
              link={`class-12/${service.slug}`}
            />
          ))}
        </div>
      )}

      {children}

      <div className="mt-10 space-y-2 border-t border-border pt-8">
        <h2>Class 12 Study Resources — Complete Guide for Pakistani Students</h2>
        <p>
          Preparing for your 12th class exams can feel overwhelming — but it does not have to be.
          GrowLearnHub brings together <strong className="text-foreground">free Class 12 notes</strong>,
          chapter-wise MCQs, online practice tests, and past papers for all major subjects under
          Punjab Board, Federal Board (FBISE), and BISE examinations. Whether you are studying
          Biology, Physics, Chemistry, Mathematics, English, or Statistics, you will find everything
          you need right here — no signup required.
        </p>

        <h2>12th Class Notes — All Subjects</h2>
        <p>
          Our 12th class notes are written in simple, easy-to-understand language and follow the
          latest Punjab Curriculum &amp; Textbook Board (PCTB) and Federal Board syllabi.
          Each subject is broken down chapter by chapter so you never lose your place. Key topics,
          definitions, and diagrams are highlighted to help you revise faster before exams.
          Subjects covered include Biology, Physics, Chemistry, Mathematics, English,
          Urdu, Statistics, Economics, and Computer Science.
        </p>

        <h2>Chapter-wise MCQs for Class 12</h2>
        <p>
          Multiple choice questions (MCQs) carry significant marks in board exams. Our
          chapter-wise <strong className="text-foreground">Class 12 MCQs</strong> are carefully
          sourced from past papers and model papers so you practice exactly what appears in real
          exams. Each question comes with the correct answer and a short explanation, making
          self-study straightforward even without a tutor.
        </p>

        <h2>Online Tests for 12th Class</h2>
        <p>
          Sitting a timed online test is the closest thing to sitting a real board exam from home.
          Our <strong className="text-foreground">Class 12 online tests</strong> are organised by
          subject and chapter. You get instant results, a breakdown of correct and incorrect
          answers, and a score you can track over time. Regular practice tests help you manage
          exam anxiety and improve both speed and accuracy before results day.
        </p>

        <h2>Class 12 Past Papers — Punjab, Federal &amp; BISE Boards</h2>
        <p>
          Past papers are the single most effective revision tool for Pakistani board exams.
          Examiners often repeat question patterns, so working through five years of
          <strong className="text-foreground"> 12th class past papers</strong> gives you a clear
          picture of what to expect. GrowLearnHub hosts past papers for Punjab Board, FBISE, and
          major BISE boards going back several years, all free to read and download.
        </p>

        <h3>Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              value: 'faq-1',
              q: 'Are the Class 12 notes on GrowLearnHub free?',
              a: 'Yes, all notes, MCQs, online tests, and past papers on GrowLearnHub are completely free. No account or payment is required.',
            },
            {
              value: 'faq-2',
              q: 'Which boards are covered for 12th class?',
              a: 'We cover Punjab Board (PCTB), Federal Board (FBISE), and most regional BISE boards including Lahore, Rawalpindi, Gujranwala, Multan, Faisalabad, Sahiwal, Sargodha, Bahawalpur, and DG Khan.',
            },
            {
              value: 'faq-3',
              q: 'How many years of past papers are available for Class 12?',
              a: 'We aim to provide at least five years of past papers per subject. Some subjects have more going back to 2015.',
            },
            {
              value: 'faq-4',
              q: 'Can I take online tests on mobile?',
              a: 'Yes. The online test interface is fully responsive and works on any smartphone or tablet browser.',
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
