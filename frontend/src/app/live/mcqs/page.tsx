'use client';
import dynamic from 'next/dynamic';

const LiveMcqsContent = dynamic(() => import('./content'), { ssr: false });

export default function LiveMcqsPage() {
  return <LiveMcqsContent />;
}
