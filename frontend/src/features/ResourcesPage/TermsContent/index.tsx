'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function TermsContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          Terms and Conditions
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            Welcome to Growlearnhub. By accessing and using our website, you agree to be bound by
            these Terms and Conditions.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Use of Website
          </Heading3>
          <Para className="text-muted-foreground">
            You may use our website for educational purposes only. You agree not to use the website
            for any unlawful purpose or in any way that could damage, disable, or impair the
            website.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Intellectual Property
          </Heading3>
          <Para className="text-muted-foreground">
            All content on Growlearnhub, including study materials, past papers, and other
            resources, are protected by copyright laws. You may download materials for personal
            educational use only.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            User Accounts
          </Heading3>
          <Para className="text-muted-foreground">
            If you create an account on our website, you are responsible for maintaining the
            confidentiality of your account and password.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Disclaimer
          </Heading3>
          <Para className="text-muted-foreground">
            The information provided on Growlearnhub is for educational purposes only. We strive to
            provide accurate information but make no warranties about the completeness or accuracy
            of any content.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Changes to Terms
          </Heading3>
          <Para className="text-muted-foreground">
            We reserve the right to modify these Terms and Conditions at any time. Your continued
            use of the website constitutes acceptance of any changes.
          </Para>
        </div>
      </div>
    </section>
  );
}
