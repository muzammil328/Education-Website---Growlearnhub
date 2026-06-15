'use client';

import React from 'react';
import { useCurrentUser } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardDescription, CardHeader, CardTitle, Heading3, Label, Para, Switch } from '@muzammil328/ui';

export default function SettingsPage() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Para>Loading...</Para>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <Para className="text-sm text-muted-foreground">
                Receive email updates about your account
              </Para>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <Para className="text-sm text-muted-foreground">Receive news and promotional emails</Para>
            </div>
            <Switch />
          </div>

          <div className="pt-4 border-t">
            <Heading3 className="text-lg font-semibold mb-4">Account Info</Heading3>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Para className="font-medium">{user?.username}</Para>
                <Para className="text-sm text-muted-foreground">{user?.email}</Para>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
