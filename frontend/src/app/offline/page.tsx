'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">📡</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">You&apos;re offline</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          No internet connection. Any MCQ attempts you submit will be saved and automatically synced when you&apos;re back online.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
      >
        Try again
      </button>
    </div>
  );
}
