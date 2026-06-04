'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function PrivacyPolicyContent() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading3 size="lg" weight="bold">
          Privacy Policy
        </Heading3>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <Para className="text-muted-foreground">
            At Growlearnhub, we take your privacy seriously. This Privacy Policy outlines how we
            collect, use, and protect your personal information.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Information We Collect
          </Heading3>
          <Para className="text-muted-foreground">
            We may collect personal information such as your name, email address, and phone number
            when you contact us or use our services. We also collect non-personal information such
            as browser type and pages visited for analytical purposes.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            How We Use Your Information
          </Heading3>
          <Para className="text-muted-foreground">
            The information we collect is used to provide and improve our services, respond to your
            inquiries, and send you relevant updates about our platform.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Data Protection
          </Heading3>
          <Para className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Third-Party Services
          </Heading3>
          <Para className="text-muted-foreground">
            We may use third-party services for analytics and website functionality. These services
            have their own privacy policies governing their use of your information.
          </Para>

          <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
            Contact Us
          </Heading3>
          <Para className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us through our
            Contact Us page.
          </Para>
        </div>
      </div>
    </section>
  );
}
