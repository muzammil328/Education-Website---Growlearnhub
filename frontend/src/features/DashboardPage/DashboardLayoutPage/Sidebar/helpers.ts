import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  CircleHelp,
  Briefcase,
  GraduationCap,
  Book,
  FileText,
  Heading1,
  Heading2,
  ClipboardList,
  Users,
  UsersRound,
  Mail,
  Bug,
  Lightbulb,
} from 'lucide-react';
import type { UserRole as ContractUserRole } from '@muzammil328/education-packages/enums';

export type UserRole = `${ContractUserRole}`;

export interface NavItemDef {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: UserRole[] | 'all';
}

export interface SectionDef {
  label: string;
  items: NavItemDef[];
}

export const MAIN_SECTIONS: SectionDef[] = [
  {
    label: 'Learning Management',
    items: [
      { label: 'Overview', path: '/dashboard', icon: LayoutDashboard, roles: 'all' },
      { label: 'Courses', path: '/dashboard/courses', icon: BookOpen, roles: 'all' },
      { label: 'Events', path: '/dashboard/events', icon: CalendarDays, roles: 'all' },
      {
        label: 'MCQs',
        path: '/dashboard/mcqs',
        icon: CircleHelp,
        roles: ['admin', 'teacher', 'super-admin'],
      },
      { label: 'Services', path: '/dashboard/service', icon: Briefcase, roles: ['super-admin'] },
    ],
  },
  {
    label: 'Academic Structure',
    items: [
      { label: 'Classes', path: '/dashboard/class', icon: GraduationCap, roles: ['super-admin'] },
      { label: 'Books', path: '/dashboard/book', icon: Book, roles: ['super-admin'] },
      { label: 'Chapters', path: '/dashboard/chapter', icon: FileText, roles: ['super-admin'] },
      {
        label: 'Headings',
        path: '/dashboard/heading',
        icon: Heading1,
        roles: ['super-admin'],
      },
      {
        label: 'Sub Headings',
        path: '/dashboard/sub-heading',
        icon: Heading2,
        roles: ['super-admin'],
      },
      {
        label: 'Boards',
        path: '/dashboard/boards',
        icon: ClipboardList,
        roles: ['super-admin'],
      },
    ],
  },
  {
    label: 'User Management',
    items: [
      {
        label: 'Students',
        path: '/dashboard/students',
        icon: Users,
        roles: ['teacher', 'super-admin'],
      },
      {
        label: 'Class Groups',
        path: '/dashboard/class-groups',
        icon: UsersRound,
        roles: ['teacher', 'super-admin'],
      },
    ],
  },
];

export const SUPPORT_SECTION: SectionDef = {
  label: 'Support',
  items: [
    { label: 'Contact Us', path: '/dashboard/contact-us', icon: Mail, roles: ['super-admin'] },
    { label: 'Bug Report', path: '/dashboard/bug-report', icon: Bug, roles: ['super-admin'] },
    {
      label: 'Feature Request',
      path: '/dashboard/feature-request',
      icon: Lightbulb,
      roles: ['super-admin'],
    },
  ],
};

export function getFilteredSection(section: SectionDef, role: UserRole): SectionDef {
  return {
    ...section,
    items: section.items.filter(
      item => item.roles === 'all' || item.roles.includes(role)
    ),
  };
}
