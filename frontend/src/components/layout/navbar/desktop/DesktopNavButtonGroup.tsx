'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@muzammil328/ui';
import { FaBars } from 'react-icons/fa';
import { DarkLightModeButton } from '@/components/elements/Button';

export default function DesktopNavButtonGroup({ setOpen }: { setOpen: (value: boolean) => void }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 lg:flex-row">
      <div className="flex items-center gap-4">
        <Button
          size={'icon'}
          variant={'destructive'}
          className="lg:hidden!"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </Button>
        <Button variant="default" className="hidden md:block" asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button variant="outline" className="hidden md:block" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <DarkLightModeButton />
      </div>
    </div>
  );
}
