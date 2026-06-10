'use client';

import { useState } from 'react';
import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

type StatusFilter = 'all' | 'pending' | 'completed' | 'failed' | 'refunded';

export default function PaymentsAdminPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilter>('all');

  const { data: summary } = trpc.payment.revenueSummary.useQuery(undefined, { refetchOnWindowFocus: false });
  const { data, isLoading } = trpc.payment.adminList.useQuery({ page, limit: 20, status }, { refetchOnWindowFocus: false });

  const confirmPayment = trpc.payment.confirmPayment.useMutation();

  const statusColor: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    failed: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
    refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `PKR ${(summary?.totalRevenuePKR ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
          { label: 'This Month', value: `PKR ${(summary?.monthRevenuePKR ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-blue-600' },
          { label: 'Completed', value: summary?.completedCount ?? 0, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Pending', value: summary?.pendingCount ?? 0, icon: Clock, color: 'text-amber-600' },
        ].map(card => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <card.icon className={cn('w-8 h-8 shrink-0', card.color)} />
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'completed', 'failed', 'refunded'] as StatusFilter[]).map(s => (
          <button
            key={s}
            onClick={() => { setStatus(s); setPage(1); }}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition capitalize',
              status === s ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/50',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {['User', 'Amount', 'Type', 'Status', 'Transaction ID', 'Date', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && (
              <tr><td colSpan={7} className="text-center py-8 text-muted-foreground text-sm">Loading...</td></tr>
            )}
            {!isLoading && !data?.data?.length && (
              <tr><td colSpan={7} className="text-center py-8 text-muted-foreground text-sm">No payments found</td></tr>
            )}
            {data?.data?.map(p => (
              <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{p.user?.username ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">{p.user?.email}</p>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{p.currency} {p.amount.toLocaleString()}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.type}</td>
                <td className="px-4 py-3">
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold capitalize', statusColor[p.status] ?? 'bg-muted text-muted-foreground')}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{p.transactionId ?? '—'}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB') : '—'}
                </td>
                <td className="px-4 py-3">
                  {p.status === 'pending' && (
                    <button
                      onClick={() => confirmPayment.mutate({ paymentId: p.id, transactionId: `manual-${Date.now()}` })}
                      disabled={confirmPayment.isPending}
                      className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(data?.pagination?.pages ?? 1) > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page} of {data?.pagination?.pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 border border-border rounded-lg disabled:opacity-40 hover:bg-muted transition">Prev</button>
            <button onClick={() => setPage(p => p + 1)} disabled={page >= (data?.pagination?.pages ?? 1)} className="px-3 py-1.5 border border-border rounded-lg disabled:opacity-40 hover:bg-muted transition">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
