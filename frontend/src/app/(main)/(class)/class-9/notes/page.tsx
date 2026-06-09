import { Metadata } from 'next';
import UserLayout from '@/components/layout/UserLayout';

const CLASS_SLUG = 'class-9';

export const metadata: Metadata = {
  title: 'Class 9 Notes — Coming Soon | GrowLearnHub',
  description: 'Class 9 notes are coming soon. Stay tuned for comprehensive study materials.',
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <UserLayout
      title="Class 9 Notes"
      image="/9th/class_9_book_growlearnhub.png"
      canonical={`/${CLASS_SLUG}/notes/`}
      url={`https://growlearnhub.com/${CLASS_SLUG}/notes/`}
    >
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-3xl font-bold text-primary">Class 9 Notes</h1>
        <p className="text-lg text-muted-foreground">Coming Soon</p>
      </div>
    </UserLayout>
  );
}
