import Link from 'next/link';
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { APP_CONFIG } from '@muzammil328/education-packages';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <FaGraduationCap className="h-6 w-6 text-primary" />
      <span className="font-bold">{APP_CONFIG.name}</span>
    </Link>
  );
}
