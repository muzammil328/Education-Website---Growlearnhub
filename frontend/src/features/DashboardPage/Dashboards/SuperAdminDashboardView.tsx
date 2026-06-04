'use client';

import React from 'react';
import { Card } from '@muzammil328/ui';

export function SuperAdminDashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the super admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">System Status</h2>
          <p className="text-sm text-muted-foreground mt-2">All core services are healthy.</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Manage admin, teacher, and student roles.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Content Control</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Review and approve educational content updates.
          </p>
        </Card>
      </div>
    </div>
  );
}
