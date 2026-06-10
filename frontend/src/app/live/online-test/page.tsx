'use client';
import dynamic from 'next/dynamic';

const LiveOnlineTestContent = dynamic(() => import('./content'), { ssr: false });

export default function LiveOnlineTestPage() {
  return <LiveOnlineTestContent />;
}
