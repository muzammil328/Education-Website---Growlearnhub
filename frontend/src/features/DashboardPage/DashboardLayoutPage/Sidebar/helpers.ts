import React, { ReactNode } from 'react';
import {
  Home,
  BookOpen,
  Book,
  Plus,
  Settings,
  FileText,
  MessageSquare,
  Bug,
  Lightbulb,
  Users,
  GraduationCap,
} from 'lucide-react';
import type { UserRole as ContractUserRole } from '@muzammil328/education-packages/enums';

export type UserRole = `${ContractUserRole}`;

export type IconName =
  | 'Home'
  | 'BookOpen'
  | 'Book'
  | 'FileText'
  | 'Settings'
  | 'Plus'
  | 'MessageSquare'
  | 'Bug'
  | 'Lightbulb'
  | 'Users'
  | 'GraduationCap';

export function getIcon(iconName: IconName): React.ReactNode {
  const iconProps = { className: 'h-4 w-4' };

  switch (iconName) {
    case 'Home':
      return React.createElement(Home, iconProps);
    case 'BookOpen':
      return React.createElement(BookOpen, iconProps);
    case 'Book':
      return React.createElement(Book, iconProps);
    case 'Settings':
      return React.createElement(Settings, iconProps);
    case 'FileText':
      return React.createElement(FileText, iconProps);
    case 'Plus':
      return React.createElement(Plus, iconProps);
    case 'MessageSquare':
      return React.createElement(MessageSquare, iconProps);
    case 'Bug':
      return React.createElement(Bug, iconProps);
    case 'Lightbulb':
      return React.createElement(Lightbulb, iconProps);
    case 'Users':
      return React.createElement(Users, iconProps);
    case 'GraduationCap':
      return React.createElement(GraduationCap, iconProps);
    default:
      return React.createElement(Home, iconProps);
  }
}

export interface RouteItem {
  label: string;
  slug: string; // URL path
  roles: UserRole[] | 'all'; // 'all' means visible to all roles
}

export interface RouteSection {
  label: string;
  slug: string; // URL path
  icon: IconName;
  roles: UserRole[] | 'all'; // 'all' means visible to all roles
  submenu?: RouteItem[];
}

/**
 * All available routes
 */
export const ROUTES: RouteSection[] = [
  {
    label: 'Overview',
    slug: '/dashboard',
    icon: 'Home',
    roles: 'all',
  },
  {
    label: 'Courses',
    slug: '/dashboard/courses',
    icon: 'BookOpen',
    roles: 'all',
  },
  {
    label: 'Events',
    slug: '/dashboard/events',
    icon: 'Book',
    roles: 'all',
  },
  {
    label: 'Mcqs',
    slug: '/dashboard/mcqs',
    icon: 'Book',
    roles: ['admin', 'teacher', 'super-admin'],
    submenu: [
      {
        label: 'Add',
        slug: '/dashboard/mcqs/add',
        roles: ['admin', 'teacher', 'super-admin'],
      },
      {
        label: 'View All',
        slug: '/dashboard/mcqs',
        roles: ['admin', 'teacher', 'super-admin'],
      },
    ],
  },
  {
    label: 'Services',
    slug: '/dashboard/service',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Class',
    slug: '/dashboard/class',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Book',
    slug: '/dashboard/book',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Chapter',
    slug: '/dashboard/chapter',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Heading',
    slug: '/dashboard/heading',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Sub Heading',
    slug: '/dashboard/sub-heading',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Board',
    slug: '/dashboard/boards',
    icon: 'BookOpen',
    roles: ['super-admin'],
  },
  {
    label: 'Contact Us',
    slug: '/dashboard/contact-us',
    icon: 'MessageSquare',
    roles: ['super-admin'],
  },
  {
    label: 'Bug Report',
    slug: '/dashboard/bug-report',
    icon: 'Bug',
    roles: ['super-admin'],
  },
  {
    label: 'Feature Request',
    slug: '/dashboard/feature-request',
    icon: 'Lightbulb',
    roles: ['super-admin'],
  },
  {
    label: 'Students',
    slug: '/dashboard/students',
    icon: 'Users',
    roles: ['teacher', 'super-admin'],
  },
  {
    label: 'Class Groups',
    slug: '/dashboard/class-groups',
    icon: 'GraduationCap',
    roles: ['teacher', 'super-admin'],
  },
];

interface SidebarItem {
  label: string;
  path: string;
  icon?: ReactNode;
  submenu?: SidebarItem[];
}

export function convertRoutes(routes: RouteSection[], role: UserRole): SidebarItem[] {
  return (
    routes
      // ✅ filter main routes
      .filter(route => route.roles === 'all' || route.roles.includes(role))
      .map(route => {
        const filteredSubmenu = route.submenu
          ?.filter(sub => sub.roles === 'all' || sub.roles.includes(role))
          .map(sub => ({
            label: sub.label,
            path: sub.slug,
          }));

        return {
          label: route.label,
          path: route.slug,
          icon: getIcon(route.icon),
          submenu: filteredSubmenu && filteredSubmenu.length > 0 ? filteredSubmenu : undefined,
        };
      })
  );
}
