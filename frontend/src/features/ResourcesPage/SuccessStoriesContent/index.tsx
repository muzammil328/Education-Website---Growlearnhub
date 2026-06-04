'use client';
import { Heading3, Para } from '@muzammil328/ui';

const successStories = [
  {
    name: 'Ali Khan',
    class: 'Class 12',
    story:
      'Growlearnhub helped me prepare effectively for my final exams. The past papers and MCQs were incredibly useful.',
    achievement: 'Scored 95% in Board Exams',
  },
  {
    name: 'Sara Ahmed',
    class: 'Class 10',
    story: 'The online tests helped me identify my weak areas and improve my scores significantly.',
    achievement: 'Improved by 20% in Mathematics',
  },
  {
    name: 'Muhammad Usman',
    class: 'Class 11',
    story:
      'Study notes on Growlearnhub are comprehensive and easy to understand. Highly recommended!',
    achievement: 'Topper in Physics',
  },
  {
    name: 'Fatima Rashid',
    class: 'Class 9',
    story: 'The pairing schemes helped me focus on important topics and ace my exams.',
    achievement: 'First Division in All Subjects',
  },
];

export default function SuccessStoriesContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-4xl px-4">
        <Heading3 size="lg" align="center" weight="bold" className="mb-4">
          Success Stories
        </Heading3>
        <Para align="center" className="mb-12">
          Hear from students who achieved academic success with Growlearnhub.
        </Para>

        <div className="grid gap-8 md:grid-cols-2">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {story.class}
                </span>
              </div>
              <Para className="mb-4 text-lg italic">&quot;{story.story}&quot;</Para>
              <div className="border-t pt-4">
                <Para weight="bold" className="text-primary">
                  {story.name}
                </Para>
                <Para className="text-sm text-gray-500 dark:text-gray-400">
                  {story.achievement}
                </Para>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Heading3 size="lg" weight="bold" className="mb-4">
            Share Your Story
          </Heading3>
          <Para className="text-muted-foreground">
            Have you achieved academic success using Growlearnhub? We&apos;d love to hear from you!
            Contact us to share your success story.
          </Para>
        </div>
      </div>
    </section>
  );
}
