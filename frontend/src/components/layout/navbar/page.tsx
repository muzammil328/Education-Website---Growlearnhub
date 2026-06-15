'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, Para } from '@muzammil328/ui';
import Logo from '@/components/elements/Logo';
import { DarkLightModeButton } from '@/components/elements/Button';
import { navigation } from './data';

// ── types ─────────────────────────────────────────────────────────────────────
type Category = (typeof navigation.categories)[0];

// ── desktop flyout ────────────────────────────────────────────────────────────
function FlyoutMenu({ category, onClose }: { category: Category; onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-50 w-screen border-t border-border bg-background/95 shadow-lg backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-8 py-8 lg:grid-cols-4">
        {category.sections.map(section => (
          <div key={section.name}>
            <Para className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              {section.name}
            </Para>
            <ul className="space-y-2">
              {section.items.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href || '#'}
                    onClick={onClose}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── mobile drawer ─────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setActiveTab(null);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* backdrop */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-14 z-40 bg-black/40 transition-opacity duration-300 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* drawer */}
      <div
        className={cn(
          'fixed bottom-0 left-0 top-14 z-50 flex w-80 max-w-full flex-col bg-background shadow-2xl transition-transform duration-300 md:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/60 hover:bg-muted"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* static pages */}
          <div className="border-b border-border px-5 py-3">
            {navigation.pages.map(page => (
              <Link
                key={page.name}
                href={page.href}
                onClick={onClose}
                className="block py-2.5 text-sm font-medium text-foreground hover:text-primary"
              >
                {page.name}
              </Link>
            ))}
          </div>

          {/* categories as accordion */}
          <div className="px-5 py-3">
            {navigation.categories.map(cat => (
              <div key={cat.name} className="border-b border-border last:border-0">
                <button
                  onClick={() => setActiveTab(activeTab === cat.name ? null : cat.name)}
                  className="flex w-full items-center justify-between py-3 text-sm font-semibold text-foreground"
                >
                  {cat.name}
                  <svg
                    className={cn('h-4 w-4 text-muted-foreground transition-transform', activeTab === cat.name && 'rotate-180')}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeTab === cat.name && (
                  <div className="pb-4 space-y-4">
                    {cat.sections.map(section => (
                      <div key={section.name}>
                        <Para className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                          {section.name}
                        </Para>
                        <ul className="space-y-1.5 pl-2">
                          {section.items.map(item => (
                            <li key={item.name}>
                              <Link
                                href={item.href || '#'}
                                onClick={onClose}
                                className="text-sm text-muted-foreground hover:text-foreground"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center gap-3 border-t border-border px-5 py-4">
          <Link
            href="/register"
            onClick={onClose}
            className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-semibold text-white hover:opacity-90"
          >
            Register
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-2 text-center text-sm font-semibold text-foreground hover:bg-muted"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}

// ── main navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // close on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveCategory(null);
  }, [pathname]);

  // sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close flyout when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const linkClass = (name: string) =>
    cn(
      'relative text-sm font-medium transition-colors duration-150',
      activeCategory === name ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
    );

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'sticky top-0 z-[60] w-full border-b border-border bg-background/95 backdrop-blur-sm transition-shadow duration-200',
          scrolled && 'shadow-sm'
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* left: hamburger (mobile only) + logo */}
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-muted"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Logo />
          </div>

          {/* center: desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.pages.map(page => (
              <Link
                key={page.name}
                href={page.href}
                className={cn(linkClass(''), 'px-3 py-1.5 rounded-lg hover:bg-muted')}
              >
                {page.name}
              </Link>
            ))}

            {navigation.categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                className={cn(
                  linkClass(cat.name),
                  'flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-muted'
                )}
              >
                {cat.name}
                <svg
                  className={cn('h-3.5 w-3.5 transition-transform', activeCategory === cat.name && 'rotate-180')}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-2">
            <DarkLightModeButton />
            <Link
              href="/login"
              className="hidden rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted md:block"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="hidden rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 md:block"
            >
              Register
            </Link>
          </div>
        </div>

        {/* desktop flyout */}
        {activeCategory && (
          <FlyoutMenu
            category={navigation.categories.find(c => c.name === activeCategory)!}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </nav>

      {/* mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
