import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  CircleHelp,
  Briefcase,
  GraduationCap,
  BookMarked,
  Heading1,
  Heading2,
  ClipboardList,
  Users,
  UsersRound,
  Mail,
  Bug,
  Lightbulb,
  Star,
  MessageSquare,
  User,
  Settings,
  Library,
  PlusSquare,
  BarChart2,
  Zap,
  CreditCard,
  Upload,
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
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: 'all' },
      { label: 'Profile', path: '/dashboard/profile', icon: User, roles: 'all' },
      { label: 'Settings', path: '/dashboard/settings', icon: Settings, roles: 'all' },
      { label: 'Courses', path: '/dashboard/courses', icon: Library, roles: 'all' },
      { label: 'Events', path: '/dashboard/events', icon: CalendarDays, roles: 'all' },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { label: 'Services', path: '/dashboard/service', icon: Briefcase, roles: ['super-admin'] },
      { label: 'Classes', path: '/dashboard/class', icon: GraduationCap, roles: ['super-admin'] },
      { label: 'Books', path: '/dashboard/book', icon: BookMarked, roles: ['super-admin'] },
      { label: 'Chapters', path: '/dashboard/chapter', icon: BookOpen, roles: ['super-admin'] },
      { label: 'Headings', path: '/dashboard/heading', icon: Heading1, roles: ['super-admin'] },
      { label: 'Sub Headings', path: '/dashboard/sub-heading', icon: Heading2, roles: ['super-admin'] },
      { label: 'Boards', path: '/dashboard/boards', icon: ClipboardList, roles: ['super-admin'] },
    ],
  },
  {
    label: 'MCQs',
    items: [
      { label: 'All MCQs', path: '/dashboard/mcqs', icon: CircleHelp, roles: ['admin', 'teacher', 'super-admin'] },
      { label: 'Add MCQ', path: '/dashboard/mcqs/add', icon: PlusSquare, roles: ['admin', 'teacher', 'super-admin'] },
    ],
  },
  {
    label: 'User Management',
    items: [
      { label: 'Students', path: '/dashboard/students', icon: Users, roles: ['teacher', 'super-admin'] },
      { label: 'Class Groups', path: '/dashboard/class-groups', icon: UsersRound, roles: ['teacher', 'super-admin'] },
    ],
  },
  {
    label: 'Teaching Tools',
    items: [
      { label: 'Teacher Dashboard', path: '/dashboard/teacher', icon: BarChart2, roles: ['teacher', 'super-admin'] },
      { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart2, roles: ['super-admin'] },
      { label: 'Bulk Import', path: '/dashboard/bulk-import', icon: Upload, roles: ['super-admin'] },
    ],
  },
  {
    label: 'Billing',
    items: [
      { label: 'Payments', path: '/dashboard/payments', icon: CreditCard, roles: ['super-admin'] },
    ],
  },
  {
    label: 'Practice',
    items: [
      { label: 'Micro Burst ⚡', path: '/burst', icon: Zap, roles: ['student', 'guest'] },
    ],
  },
];

export const SUPPORT_SECTION: SectionDef = {
  label: 'Support & Feedback',
  items: [
    { label: 'Contact Us', path: '/dashboard/contact-us', icon: Mail, roles: ['super-admin'] },
    { label: 'Bug Reports', path: '/dashboard/bug-report', icon: Bug, roles: ['super-admin'] },
    { label: 'Feature Requests', path: '/dashboard/feature-request', icon: Lightbulb, roles: ['super-admin'] },
    { label: 'Share Story', path: '/dashboard/share-story', icon: Star, roles: ['super-admin'] },
    { label: 'Comments', path: '/dashboard/comments', icon: MessageSquare, roles: ['super-admin'] },
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
