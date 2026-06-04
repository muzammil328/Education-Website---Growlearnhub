'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function DisclaimerContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          Disclaimer
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            The information provided on Growlearnhub is for general educational purposes only. We
            strive to provide accurate and up-to-date content, but we make no warranties or
            representations about the completeness, accuracy, or reliability of any information on
            this website.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Educational Content
          </Heading3>
          <Para className="text-muted-foreground">
            All study materials, past papers, MCQs, and other educational content on Growlearnhub
            are intended to supplement classroom learning. They should not replace formal
            instruction or textbooks.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Exam Preparation
          </Heading3>
          <Para className="text-muted-foreground">
            While we strive to provide relevant exam preparation materials, we cannot guarantee that
            our materials will match actual exam questions. Past papers and guess papers are based
            on previous years&apos; patterns and should be used as practice only.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            External Links
          </Heading3>
          <Para className="text-muted-foreground">
            Our website may contain links to external websites. We are not responsible for the
            content or accuracy of these external sites.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            No Professional Advice
          </Heading3>
          <Para className="text-muted-foreground">
            The information on this website is not intended as professional academic or career
            advice. For specific guidance, please consult with qualified educators or professionals.
          </Para>
        </div>
      </div>
    </section>
  );
}
