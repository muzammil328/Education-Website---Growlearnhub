'use client';
import React from 'react';
import { Dialog, DialogContent } from '@muzammil328/ui';
import { RegisterForm } from './RegisterForm';

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5">
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}
