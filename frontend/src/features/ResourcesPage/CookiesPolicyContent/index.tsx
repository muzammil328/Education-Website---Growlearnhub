'use client';
import { Heading3, Para } from '@muzammil328/ui';

export default function CookiesPolicyContent() {
  return (
    <section className="relative py-20">
      <Heading3 weight="bold" size="lg">
        Cookies Policy
      </Heading3>

      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <Para className="text-muted-foreground">
          This Cookies Policy explains what Cookies are and how Growlearnhub uses them.
        </Para>

        <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
          What Are Cookies
        </Heading3>
        <Para className="text-muted-foreground">
          Cookies are small text files stored on your device when you visit websites. They help
          websites remember your preferences and improve your browsing experience.
        </Para>

        <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
          How We Use Cookies
        </Heading3>
        <Para className="text-muted-foreground">Growlearnhub uses cookies to:</Para>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Understand how you use our website</li>
          <li>Improve our services and user experience</li>
          <li>Remember your preferences</li>
          <li>Analyze traffic and trends</li>
        </ul>

        <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
          Managing Cookies
        </Heading3>
        <Para className="text-muted-foreground">
          You can control or disable cookies through your browser settings. However, disabling
          cookies may affect the functionality of our website.
        </Para>

        <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
          Third-Party Cookies
        </Heading3>
        <Para className="text-muted-foreground">
          We may use third-party analytics services that set their own cookies. These third parties
          have their own privacy policies.
        </Para>

        <Heading3 size="lg" weight="bold" className="mt-8 mb-4">
          Contact Us
        </Heading3>
        <Para className="text-muted-foreground">
          If you have questions about our Cookies Policy, please contact us.
        </Para>
      </div>
    </section>
  );
}
