'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import Sidebar from './Sidebar/page';
import HeaderUserProfile from './Sidebar/HeaderUserProfile';
import { DarkLightModeButton } from '@/components/elements/Button';
import { useAuth } from '@/context/AuthContext';

const EXPANDED_OFFSET = 280 + 12 * 2;
const COLLAPSED_OFFSET = 80 + 12 * 2;

const SEGMENT_LABELS: Record<string, string> = {
  dashboard:   'Dashboard',
  overview:    'Overview',
  courses:     'Courses',
  events:      'Events',
  mcqs:        'MCQs',
  service:     'Services',
  class:       'Classes',
  book:        'Books',
  chapter:     'Chapters',
  heading:     'Headings',
  'sub-heading': 'Sub Headings',
  boards:      'Boards',
  students:    'Students',
  'class-groups': 'Class Groups',
  'contact-us':   'Contact Us',
  'bug-report':   'Bug Report',
  'feature-request': 'Feature Request',
  profile:     'Profile',
  settings:    'Settings',
};

function label(seg: string) {
  return SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
}

function DashboardBreadcrumbs({ pathname }: { pathname: string }) {
  // Build crumbs: Home > Dashboard > … > Current
  const segments = pathname.split('/').filter(Boolean); // ['dashboard', 'boards', ...]

  const crumbs: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
  ];

  let href = '';
  for (const seg of segments) {
    href += `/${seg}`;
    crumbs.push({ label: label(seg), href });
  }

  return (
    <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.href}>
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
            {i === 0 && (
              <Home className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
            {isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : i === 0 ? (
              <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Home</span>
              </Link>
            ) : (
              <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  const sidebarOffset = isDesktop ? (isCollapsed ? COLLAPSED_OFFSET : EXPANDED_OFFSET) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />

      <div
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarOffset }}
      >
        {/* Desktop top header */}
        {isDesktop && (
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
            {/* Left: breadcrumbs */}
            <DashboardBreadcrumbs pathname={pathname} />

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              <DarkLightModeButton />
              <HeaderUserProfile />
            </div>
          </header>
        )}

        {!isDesktop && <div className="h-14" />}

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
