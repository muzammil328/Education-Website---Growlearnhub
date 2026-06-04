'use client';
import React from 'react';
import { Dialog, DialogContent } from '@muzammil328/ui';
import { LoginForm } from './LoginForm';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
