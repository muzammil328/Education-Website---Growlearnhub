'use client';

import React, { useState } from 'react';
import { Button } from '@muzammil328/ui';
import { Input } from '@muzammil328/ui';
import { Plus, Users } from 'lucide-react';
import { toast } from '@muzammil328/ui';

type ClassGroupRow = {
  groupId: string;
  name: string;
  memberCount: number;
};

export default function DashboardClassGroupsPage() {
  const [newGroupName, setNewGroupName] = useState('');
  const [groups, setGroups] = useState<ClassGroupRow[]>([]);
  const [isPending, setIsPending] = useState(false);
  const isLoading = false;

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Group name is required');
      return;
    }

    setIsPending(true);
    setGroups(prev => [
      ...prev,
      {
        groupId: crypto.randomUUID(),
        name: newGroupName.trim(),
        memberCount: 0,
      },
    ]);
    toast.success('Class group created successfully');
    setNewGroupName('');
    setIsPending(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="New class group name"
          value={newGroupName}
          onChange={e => setNewGroupName(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleCreateGroup} disabled={isPending}>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="border rounded-md">
        <div className="p-4 bg-gray-100">
          <h3 className="font-semibold">Class Groups</h3>
        </div>
        <div className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : groups.length === 0 ? (
            <p className="text-gray-500">No class groups found</p>
          ) : (
            <div className="space-y-2">
              {groups.map(group => (
                <div
                  key={group.groupId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500">{group.memberCount} members</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
