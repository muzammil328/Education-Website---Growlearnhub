'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@muzammil328/ui';
import { ChevronDown } from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: SidebarItem[];
}

interface Props {
  item: SidebarItem;
  index: number;
  activeDropdown: number | null;
  setActiveDropdown: (i: number | null) => void;
  isCollapsed: boolean;
  isActive: (path: string) => boolean;
  isMobile?: boolean;
  closeSidebar?: () => void;
}

const SidebarItem: React.FC<Props> = ({
  item,
  index,
  activeDropdown,
  setActiveDropdown,
  isCollapsed,
  isActive,
  isMobile,
  closeSidebar,
}) => {
  const isOpen = activeDropdown === index;

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={open => setActiveDropdown(open ? index : null)}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className={`w-full justify-between ${isOpen ? 'bg-accent' : ''}`}>
            <div className="flex items-center gap-2">
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </div>

            {!isCollapsed && (
              <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-6 space-y-1">
          {item.submenu.map((sub, i) => (
            <Button
              key={i}
              variant="ghost"
              className={`w-full justify-start ${isActive(sub.path) ? 'bg-accent' : ''}`}
              asChild
              onClick={() => isMobile && closeSidebar?.()}
            >
              <Link href={sub.path}>{!isCollapsed && sub.label}</Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full justify-start ${isActive(item.path) ? 'bg-accent' : ''}`}
            asChild
            onClick={() => isMobile && closeSidebar?.()}
          >
            <Link href={item.path} className="flex gap-2">
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </Button>
        </TooltipTrigger>

        {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
