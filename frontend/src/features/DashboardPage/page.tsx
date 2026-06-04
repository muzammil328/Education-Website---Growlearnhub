'use client';

import React from 'react';
import { AdminDashboardView } from '@/features/DashboardPage/Dashboards/AdminDashboardView';
import { StudentDashboardView } from '@/features/DashboardPage/Dashboards/StudentDashboardView';
import { TeacherDashboardView } from '@/features/DashboardPage/Dashboards/TeacherDashboardView';
import { ParentDashboardView } from '@/features/DashboardPage/Dashboards/ParentDashboardView';
import { SuperAdminDashboardView } from '@/features/DashboardPage/Dashboards/SuperAdminDashboardView';
import { DefaultDashboardView } from '@/features/DashboardPage/Dashboards/DefaultDashboardView';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <DefaultDashboardView />;
  }

  const userRole = user.role;

  if (userRole === 'super_admin') {
    return <SuperAdminDashboardView />;
  }

  if (userRole === 'admin') {
    return <AdminDashboardView />;
  }

  if (userRole === 'teacher') {
    return <TeacherDashboardView />;
  }

  if (userRole === 'student') {
    return <StudentDashboardView />;
  }

  if (userRole === 'parent') {
    return <ParentDashboardView />;
  }

  return <DefaultDashboardView />;
}
