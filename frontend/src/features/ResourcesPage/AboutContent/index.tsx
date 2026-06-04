'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function AboutContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          About Growlearnhub
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            Welcome to Growlearnhub, your premier destination for quality education and learning
            resources. We are dedicated to providing students with comprehensive study materials,
            past papers, MCQs, and online tests to help them succeed in their academic journey.
          </Para>

          <Para className="text-muted-foreground">
            Our platform covers a wide range of subjects and classes, from Class 9 to Class 12,
            including vocational education resources. We believe that education is the key to
            personal growth and societal development.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-12 mb-4">
            Our Mission
          </Heading3>
          <Para className="text-muted-foreground">
            Our mission is to make quality education accessible to everyone. We strive to provide
            the best learning resources, tools, and support to help students achieve their full
            potential and excel in their studies.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-12 mb-4">
            Our Vision
          </Heading3>
          <Para className="text-muted-foreground">
            We envision a world where every student has access to quality educational resources
            regardless of their background. Growlearnhub aims to be the go-to platform for students
            seeking to enhance their knowledge and academic performance.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-12 mb-4">
            What We Offer
          </Heading3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Comprehensive study notes for all subjects</li>
            <li>Past papers and guess papers</li>
            <li>Multiple choice questions (MCQs)</li>
            <li>Online tests and quizzes</li>
            <li>Pairing schemes</li>
            <li>Date sheets and results</li>
            <li>Books and educational resources</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
