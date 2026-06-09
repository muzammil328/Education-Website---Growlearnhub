import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

const CLASS_SLUG = 'class-12';

export const metadata: Metadata = {
  title: 'Class 12 Notes — Coming Soon | GrowLearnHub',
  description: 'Class 12 notes are coming soon. Stay tuned for comprehensive study materials.',
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <UserLayout
      title="Class 12 Notes"
      image="/12th/class_12_book_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/notes/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/notes/`}
    >
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-3xl font-bold text-primary">Class 12 Notes</h1>
        <p className="text-lg text-muted-foreground">Coming Soon</p>
      </div>
    </UserLayout>
  );
}
