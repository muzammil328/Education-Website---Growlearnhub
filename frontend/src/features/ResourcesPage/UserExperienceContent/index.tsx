'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function UserExperienceContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          User Experience
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            At Growlearnhub, we are committed to providing an exceptional user experience. Our
            platform is designed to be intuitive, accessible, and helpful for students of all ages.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Easy Navigation
          </Heading3>
          <Para className="text-muted-foreground">
            Our website features a clean, organized layout that makes it easy to find what
            you&apos;re looking for. Browse by class, subject, or content type with just a few
            clicks.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Mobile-Friendly Design
          </Heading3>
          <Para className="text-muted-foreground">
            Access Growlearnhub from any device. Our responsive design ensures a seamless experience
            on desktops, tablets, and mobile phones.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Fast Loading
          </Heading3>
          <Para className="text-muted-foreground">
            We understand the importance of quick access to educational materials. Our platform is
            optimized for fast loading times so you can focus on learning.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Accessibility
          </Heading3>
          <Para className="text-muted-foreground">
            We strive to make our content accessible to all users. Our platform supports screen
            readers and includes features for users with visual impairments.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Feedback & Support
          </Heading3>
          <Para className="text-muted-foreground">
            Have suggestions or encountered issues? Use our &quot;Report a Bug&quot; or
            &quot;Request Feature&quot; pages to help us improve your experience.
          </Para>
        </div>
      </div>
    </section>
  );
}
