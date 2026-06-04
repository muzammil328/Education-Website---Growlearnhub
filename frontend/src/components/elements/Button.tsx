'use client';
import React, { useEffect, useState } from 'react';
import { useTheme, Button } from '@muzammil328/ui';
import { Menu, X, Moon, Sun } from 'lucide-react';

export function DarkLightModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();

  // State to check if the component has mounted (client-side only)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure that the theme-dependent content is only rendered client-side
  }, []);

  // Return null if not mounted yet to avoid hydration error
  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Button
      size="icon"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function MenuToXButton({
  isOpen,
  toggleSidebar,
  toggleSidebarClose,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleSidebarClose: () => void;
}) {
  return (
    <>
      {isOpen ? (
        <Button
          size="icon"
          variant={'destructive'}
          className="lg:hidden"
          onClick={toggleSidebarClose}
        >
          <X className="" />
        </Button>
      ) : (
        <Button size="icon" className="lg:hidden" variant={'destructive'} onClick={toggleSidebar}>
          <Menu className="" />
        </Button>
      )}
    </>
  );
}
