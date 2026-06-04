'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@muzammil328/ui';
import { ScrollArea } from '@muzammil328/ui';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@muzammil328/ui';
import { ChevronRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { DarkLightModeButton, MenuToXButton } from '@/components/elements/Button';
import SidebarUserProfile from './SidebarUserProfile';
import HeaderUserProfile from './HeaderUserProfile';
import { ROUTES, UserRole, convertRoutes } from './helpers';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const sidebarWidth = isSidebarCollapsed ? 'w-20' : 'w-64';

  const sidebarVariants = useMemo(
    () => ({
      open: { x: 0 },
      closed: { x: '-100%' },
    }),
    []
  );
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const role = useMemo<UserRole>(() => {
    switch (user?.role) {
      case 'super_admin':
        return 'super-admin';
      case 'teacher':
        return 'teacher';
      case 'admin':
        return 'admin';
      case 'parent':
        return 'parent';
      default:
        return 'student';
    }
  }, [user?.role]);

  const navItems = useMemo(() => convertRoutes(ROUTES, role), [role]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncSidebarState = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };

    syncSidebarState(mediaQuery);
    mediaQuery.addEventListener('change', syncSidebarState);

    return () => {
      mediaQuery.removeEventListener('change', syncSidebarState);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleSidebarClose = () => setIsSidebarOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <React.Fragment>
      <header
        className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4 transition-colors duration-300 lg:px-6"
        ref={sidebarRef}
      >
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="flex items-center gap-2 font-semibold" href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive text-white">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span
                    className={`${isSidebarCollapsed ? 'lg:hidden' : ''} text-foreground transition-colors duration-300`}
                  >
                    EduPlatform
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>EduPlatform - Learn Anywhere, Anytime</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
          <MenuToXButton
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            toggleSidebarClose={toggleSidebarClose}
          />
          <DarkLightModeButton />
          <HeaderUserProfile />
        </div>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`fixed inset-y-0 left-0 z-40 ${sidebarWidth} border-r bg-background transition-all duration-300 ease-in-out lg:translate-x-0`}
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="text-lg font-semibold text-foreground transition-colors duration-300">
              Navigation
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={toggleSidebarCollapse}
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`}
              />
            </Button>
          </div>
          <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
            <div className="py-4">
              {navItems.map((section, index) => (
                <div key={index} className="py-2 pr-4 border-b last:border-b-0">
                  <div className="hidden md:block space-y-1">
                    <SidebarItem
                      item={section}
                      index={index}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      isCollapsed={isSidebarCollapsed}
                      isActive={isActive}
                      isMobile={false}
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      closeSidebar={() => {}}
                    />
                  </div>
                  <div className="block md:hidden space-y-1">
                    <SidebarItem
                      item={section}
                      index={index}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      isCollapsed={isSidebarCollapsed}
                      isActive={isActive}
                      isMobile
                      closeSidebar={() => setIsSidebarOpen(false)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-auto border-t">
            <SidebarUserProfile isSidebarCollapsed={isSidebarCollapsed} />
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Sidebar;
