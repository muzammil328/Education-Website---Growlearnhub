'use client';

import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import {
  Users,
  UserCog,
  GraduationCap,
  BookOpen,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Plus,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Bell,
  UserPlus,
  ClipboardList,
  BarChart3,
  Calendar,
  Circle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type TodoFilter = 'All' | 'Open' | 'Closed' | 'Archived';

interface TodoItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  done: boolean;
  archived: boolean;
  avatars: string[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Total Students',
    value: 1_250,
    change: '+12%',
    up: true,
    icon: Users,
    color: 'bg-primary/10 text-primary',
    progress: 78,
  },
  {
    label: 'Total Teachers',
    value: 45,
    change: '+5%',
    up: true,
    icon: UserCog,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    progress: 90,
  },
  {
    label: 'Active Classes',
    value: 32,
    change: '+3',
    up: true,
    icon: GraduationCap,
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    progress: 64,
  },
  {
    label: 'Active Courses',
    value: 156,
    change: '+8',
    up: true,
    icon: BookOpen,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    progress: 55,
  },
];

const ENROLLMENTS = [
  { name: 'Sara Ahmed', class: 'Class 10 – Biology', date: 'Jun 5, 2025', status: 'Active' },
  { name: 'Usman Tariq', class: 'Class 9 – Math', date: 'Jun 4, 2025', status: 'Active' },
  { name: 'Ayesha Khan', class: 'Class 11 – Physics', date: 'Jun 3, 2025', status: 'Pending' },
  { name: 'Ali Hassan', class: 'Class 12 – English', date: 'Jun 2, 2025', status: 'Active' },
  { name: 'Fatima Malik', class: 'Class 10 – Chemistry', date: 'Jun 1, 2025', status: 'Inactive' },
];

const SUBJECT_PROGRESS = [
  { subject: 'Mathematics', enrolled: 320, capacity: 400, color: 'bg-primary' },
  { subject: 'Physics', enrolled: 210, capacity: 300, color: 'bg-blue-500' },
  { subject: 'Biology', enrolled: 280, capacity: 350, color: 'bg-emerald-500' },
  { subject: 'Chemistry', enrolled: 190, capacity: 250, color: 'bg-amber-500' },
  { subject: 'English', enrolled: 360, capacity: 400, color: 'bg-violet-500' },
];

const UPCOMING_EVENTS = [
  { title: 'Mid-Term Exams Begin', date: 'Jun 15, 2025', type: 'exam', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  { title: 'Parent-Teacher Meeting', date: 'Jun 20, 2025', type: 'meeting', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { title: 'Annual Sports Day', date: 'Jun 28, 2025', type: 'event', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
];

const ACTIVITY = [
  { action: 'New student enrolled', name: 'Zara Noor', time: '2 min ago', icon: UserPlus, color: 'text-primary' },
  { action: 'Attendance marked', name: 'Class 10-A', time: '18 min ago', icon: ClipboardList, color: 'text-blue-500' },
  { action: 'MCQ set published', name: 'Physics Ch. 5', time: '1 hr ago', icon: BarChart3, color: 'text-amber-500' },
  { action: 'Event scheduled', name: 'Science Fair', time: '3 hr ago', icon: Calendar, color: 'text-violet-500' },
  { action: 'Report generated', name: 'Monthly Summary', time: 'Yesterday', icon: ClipboardList, color: 'text-emerald-500' },
];

const INITIAL_TODOS: TodoItem[] = [
  {
    id: 1,
    title: 'Review new student applications',
    subtitle: 'Approve or reject pending registrations.',
    date: 'June 10, 2025',
    done: true,
    archived: false,
    avatars: ['SA', 'UT'],
  },
  {
    id: 2,
    title: 'Prepare monthly attendance report',
    subtitle: 'Compile data for all classes this month.',
    date: 'June 14, 2025',
    done: false,
    archived: false,
    avatars: ['AK'],
  },
  {
    id: 3,
    title: 'Schedule parent-teacher meetings',
    subtitle: 'Coordinate time slots with class teachers.',
    date: 'June 18, 2025',
    done: false,
    archived: false,
    avatars: ['AH', 'FM'],
  },
  {
    id: 4,
    title: 'Update exam timetable',
    subtitle: 'Finalize mid-term schedule for all classes.',
    date: 'June 12, 2025',
    done: false,
    archived: true,
    avatars: ['UT'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Inactive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

// Avatar initials pill
function Avatar({ initials, idx }: { initials: string; idx: number }) {
  const colors = [
    'bg-primary text-primary-foreground',
    'bg-blue-500 text-white',
    'bg-violet-500 text-white',
    'bg-amber-500 text-white',
  ];
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-background ${colors[idx % colors.length]}`}
    >
      {initials}
    </span>
  );
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar() {
  const today = new Date();
  const [offset, setOffset] = useState(0);
  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const monthLabel = format(base, 'MMMM yyyy');

  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setOffset(o => o - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-sm font-semibold">{monthLabel}</span>
        <button
          onClick={() => setOffset(o => o + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent transition-colors"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-muted-foreground pb-1">
            {d}
          </div>
        ))}
        {days.map((day, i) => {
          const isToday = isSameDay(day, today);
          return (
            <div key={i} className="flex items-center justify-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer
                  ${isToday
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'hover:bg-accent text-foreground'
                  }`}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-semibold">Profile</span>
        <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent text-muted-foreground transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        {/* Avatar ring */}
        <div className="relative mb-3">
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground bg-primary shadow-md"
            style={{
              background: 'conic-gradient(oklch(58% 0.103 176.76) 270deg, oklch(90% 0.04 176.76) 270deg)',
              padding: '3px',
            }}
          >
            <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {initials}
            </div>
          </div>
          <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 ring-2 ring-background">
            <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
          </span>
        </div>

        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
      </div>
    </div>
  );
}

// ─── To-Do Card ───────────────────────────────────────────────────────────────

function TodoCard() {
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<TodoFilter>('All');

  const toggle = (id: number) =>
    setTodos(t => t.map(item => (item.id === id ? { ...item, done: !item.done } : item)));

  const filtered = todos.filter(t => {
    if (filter === 'Open') return !t.done && !t.archived;
    if (filter === 'Closed') return t.done;
    if (filter === 'Archived') return t.archived;
    return true;
  });

  const counts = {
    All: todos.length,
    Open: todos.filter(t => !t.done && !t.archived).length,
    Closed: todos.filter(t => t.done).length,
    Archived: todos.filter(t => t.archived).length,
  };

  const FILTERS: TodoFilter[] = ['All', 'Open', 'Closed', 'Archived'];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-semibold">To Do List</span>
        <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent text-primary transition-colors">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {f}
            <span
              className={`text-[10px] ${filter === f ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-background p-3 cursor-pointer hover:border-primary/30 transition-colors"
            onClick={() => toggle(item.id)}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0 text-primary">
                {item.done ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium leading-tight ${item.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                >
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.subtitle}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] text-muted-foreground">{item.date}</p>
                  <div className="flex -space-x-1">
                    {item.avatars.map((a, i) => (
                      <Avatar key={i} initials={a} idx={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  change,
  up,
  icon: Icon,
  color,
  progress,
}: (typeof STATS)[0]) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-0.5 mb-3">{label}</p>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{progress}% of target</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminDashboardView() {
  const { user } = useAuth();
  const today = new Date();
  const greeting =
    today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const name = user?.name ?? 'Admin';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start">
      {/* ── Left: Main Content ─────────────────────────── */}
      <div className="space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {greeting}, {name} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {format(today, "EEEE, d MMMM yyyy")} · School Admin Dashboard
            </p>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-accent transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              3
            </span>
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Subject enrollment + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject progress */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">Subject Enrollment Capacity</h3>
            <div className="space-y-4">
              {SUBJECT_PROGRESS.map(s => {
                const pct = Math.round((s.enrolled / s.capacity) * 100);
                return (
                  <div key={s.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium">{s.subject}</span>
                      <span className="text-xs text-muted-foreground">
                        {s.enrolled}/{s.capacity}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{pct}% filled</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted ${a.color}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{a.action}</p>
                      <p className="text-xs text-muted-foreground">{a.name}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">
                      {a.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Recent Enrollments</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Student</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Class</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ENROLLMENTS.map((e, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                          {e.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{e.class}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{e.date}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {UPCOMING_EVENTS.map((ev, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${ev.color}`}>
                  <Circle className="h-3 w-3 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-tight">{ev.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Profile Panel ───────────────────────── */}
      <div className="space-y-4">
        <ProfileCard name={name} role="School Administrator" />
        <MiniCalendar />
        <TodoCard />
      </div>
    </div>
  );
}
