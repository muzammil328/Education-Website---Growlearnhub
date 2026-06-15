import React from 'react';
import { DarkLightModeButton } from '@/components/elements/Button';
import Logo from '@/components/elements/Logo';
import { config } from '@/config';
import { Heading1, Para } from '@muzammil328/ui';

export default function AuthPageWrapper({
  children,
  title,
  para,
}: {
  children: React.ReactNode;
  title?: string;
  para?: string;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header with Logo */}
      <div className="md:p-8 sm:p-6 p-4 flex items-center justify-between gap-2">
        <Logo />
        <DarkLightModeButton />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-6 sm:p-4 p-4 flex flex-col justify-center max-w-md">
        {/* Heading */}
        <div className="mb-8">
          <Heading1 className="text-3xl font-bold text-foreground mb-2">{title}</Heading1>
          <Para className="text-sm text-muted-foreground">{para}</Para>
        </div>

        {/* Form */}
        {children}
      </div>
      {/* Footer */}
      <div className="md:pl-8 md:pr-40 md:py-6 p-6">
        <Para className="text-xs text-muted-foreground text-center">© 2024 {config.app.NAME}. All rights reserved.</Para>
      </div>
    </div>
  );
}
