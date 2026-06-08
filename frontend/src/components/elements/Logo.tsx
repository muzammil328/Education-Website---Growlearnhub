import Link from 'next/link';
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { APP_CONFIG } from '@muzammil328/education-packages';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <FaGraduationCap className="h-8 w-8 text-primary" />
      <span className="font-bold text-xl">{APP_CONFIG.name}</span>
    </Link>
  );
}
