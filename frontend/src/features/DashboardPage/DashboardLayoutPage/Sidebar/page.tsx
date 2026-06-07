'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@muzammil328/ui';
import {
  GraduationCap,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import SidebarUserProfile from './SidebarUserProfile';
import HeaderUserProfile from './HeaderUserProfile';
import { DarkLightModeButton } from '@/components/elements/Button';
import {
  MAIN_SECTIONS,
  SUPPORT_SECTION,
  getFilteredSection,
  type NavItemDef,
  type SectionDef,
  type UserRole,
} from './helpers';

// ─── Constants ────────────────────────────────────────────────────────────────

const EXPANDED_W = 280;
const COLLAPSED_W = 80;
const PAD = 12; // internal padding on each side of the card wrapper

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  item,
  active,
  collapsed,
}: {
  item: NavItemDef;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  const inner = (
    <Link
      href={item.path}
      className={cn(
        'group relative flex h-11 items-center gap-4 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        collapsed ? 'w-11 justify-center mx-auto' : 'w-full px-4',
        active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {/* Active pill (shared layout) */}
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-full bg-primary/15"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      )}

      {/* Hover background */}
      {!active && (
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-primary/5 transition-opacity duration-150" />
      )}

      <Icon
        className={cn(
          'relative z-10 shrink-0 h-4.5 w-4.5 transition-colors',
          active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
        )}
      />

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            key="label"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 text-sm truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return inner;
}

// ─── NavSection ───────────────────────────────────────────────────────────────

function NavSection({
  section,
  collapsed,
  isActive,
}: {
  section: SectionDef;
  collapsed: boolean;
  isActive: (path: string) => boolean;
}) {
  if (section.items.length === 0) return null;

  return (
    <div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.p
            key={`section-${section.label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-1 px-4 pt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none"
          >
            {section.label}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="space-y-0.5">
        {section.items.map(item => (
          <NavItem
            key={item.path}
            item={item}
            active={isActive(item.path)}
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
}

// ─── SidebarCard content ──────────────────────────────────────────────────────

function SidebarContent({
  collapsed,
  onCollapse,
  onClose,
  mainSections,
  supportSection,
  isActive,
  mobile = false,
}: {
  collapsed: boolean;
  onCollapse?: (v: boolean) => void;
  onClose?: () => void;
  mainSections: SectionDef[];
  supportSection: SectionDef;
  isActive: (path: string) => boolean;
  mobile?: boolean;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <AnimatePresence initial={false}>
        {/* Expanded header: logo + brand + collapse btn */}
        {(!collapsed || mobile) && (
          <motion.div
            key="expanded-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3 px-4 py-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="flex-1 text-[15px] font-semibold text-foreground truncate">
              EduPlatform
            </span>
            {/* Collapse button — desktop only */}
            {!mobile && onCollapse && (
              <button
                onClick={() => onCollapse(true)}
                aria-label="Collapse sidebar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            )}
            {/* Close button — mobile only */}
            {mobile && onClose && (
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        )}

        {/* Collapsed header: only expand button, no logo */}
        {collapsed && !mobile && onCollapse && (
          <motion.div
            key="collapsed-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex justify-center px-3 py-4"
          >
            <button
              onClick={() => onCollapse(false)}
              aria-label="Expand sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto px-3 min-h-0">
        <nav className="space-y-4 pb-2" aria-label="Main navigation">
          {mainSections.map(section => (
            <NavSection
              key={section.label}
              section={section}
              collapsed={collapsed && !mobile}
              isActive={isActive}
            />
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-4 my-2 border-t border-border/50" />

      {/* Support footer */}
      <div className="px-3">
        <NavSection
          section={supportSection}
          collapsed={collapsed && !mobile}
          isActive={isActive}
        />
      </div>

      {/* User profile */}
      <div className="px-3 pb-3 pt-2">
        <SidebarUserProfile isSidebarCollapsed={collapsed && !mobile} />
      </div>
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (val: boolean) => void;
}

export default function Sidebar({ isCollapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Default true so desktop sidebar is visible immediately (avoids SSR flash)
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const role = useMemo<UserRole>(() => {
    switch (user?.role) {
      case 'super_admin': return 'super-admin';
      case 'teacher': return 'teacher';
      case 'admin': return 'admin';
      case 'parent': return 'parent';
      default: return 'student';
    }
  }, [user?.role]);

  const mainSections = useMemo(
    () =>
      MAIN_SECTIONS.map(s => getFilteredSection(s, role)).filter(s => s.items.length > 0),
    [role]
  );
  const supportSection = useMemo(() => getFilteredSection(SUPPORT_SECTION, role), [role]);

  // Close mobile drawer on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path || (path !== '/dashboard' && pathname.startsWith(path + '/'));

  const desktopW = (isCollapsed ? COLLAPSED_W : EXPANDED_W) + PAD * 2;

  return (
    <TooltipProvider delayDuration={0}>
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      {isDesktop && (
        <motion.aside
          className="fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar-gradient"
          style={{ padding: PAD }}
          initial={{ width: desktopW }}
          animate={{ width: desktopW }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          aria-label="Sidebar"
        >
          <div className="h-full overflow-hidden rounded-3xl border border-border bg-popover shadow-sm">
            <SidebarContent
              collapsed={isCollapsed}
              onCollapse={onCollapsedChange}
              mainSections={mainSections}
              supportSection={supportSection}
              isActive={isActive}
            />
          </div>
        </motion.aside>
      )}

      {/* ── Mobile Top Bar ──────────────────────────────────── */}
      {!isDesktop && (
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">EduPlatform</span>
        </Link>
        <div className="flex items-center gap-2">
          <DarkLightModeButton />
          <HeaderUserProfile />
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>
      )}

      {/* ── Mobile Overlay Drawer ───────────────────────────── */}
      {!isDesktop && (
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              aria-hidden
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex bg-sidebar-gradient"
              style={{
                padding: PAD,
                width: EXPANDED_W + PAD * 2,
              }}
              initial={{ x: -(EXPANDED_W + PAD * 2) }}
              animate={{ x: 0 }}
              exit={{ x: -(EXPANDED_W + PAD * 2) }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              aria-label="Mobile navigation"
            >
              <div className="h-full w-full overflow-hidden rounded-3xl border border-border bg-popover shadow-sm">
                <SidebarContent
                  collapsed={false}
                  onClose={() => setIsMobileOpen(false)}
                  mainSections={mainSections}
                  supportSection={supportSection}
                  isActive={isActive}
                  mobile
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      )}
    </TooltipProvider>
  );
}