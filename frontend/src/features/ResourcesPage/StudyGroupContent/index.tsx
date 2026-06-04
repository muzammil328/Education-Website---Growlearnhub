'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function StudyGroupContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          Study Groups
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            Join our study groups to collaborate with fellow students, share knowledge, and improve
            your learning experience.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            What Are Study Groups?
          </Heading3>
          <Para className="text-muted-foreground">
            Study groups are communities of students who come together to learn, discuss, and help
            each other succeed academically.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Benefits of Study Groups
          </Heading3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Collaborative learning with peers</li>
            <li>Share notes and study materials</li>
            <li>Discuss difficult topics</li>
            <li>Stay motivated and accountable</li>
            <li>Learn different perspectives</li>
          </ul>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            How to Join
          </Heading3>
          <Para className="text-muted-foreground">
            Visit our community page or contact us to learn about available study groups and how to
            join. We welcome students from all classes and subjects.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Create Your Own Group
          </Heading3>
          <Para className="text-muted-foreground">
            Want to start a study group with your classmates? Contact us and we&apos;ll help you set
            up and manage your own study group.
          </Para>
        </div>
      </div>
    </section>
  );
}
