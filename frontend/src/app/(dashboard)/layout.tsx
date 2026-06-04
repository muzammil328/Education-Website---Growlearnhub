import DashboardLayoutPage from '@/features/DashboardPage/DashboardLayoutPage/page';

export const metadata = {
  title: 'Dashboard | GrowLearnHub',
  description: 'Access your personalized dashboard with insights, analytics, and management tools.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutPage>{children}</DashboardLayoutPage>;
}
