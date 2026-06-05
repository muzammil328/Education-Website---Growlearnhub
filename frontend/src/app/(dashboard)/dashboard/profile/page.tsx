'use client';

import React from 'react';
import { useCurrentUser, useLogout } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@muzammil328/ui';
import { Label, Input } from '@muzammil328/ui';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View and manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ''} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={user?.username || ''} disabled />
          </div>

          <div className="pt-4">
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
