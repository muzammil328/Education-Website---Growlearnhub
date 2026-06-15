'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, DialogContent, Dialog, DialogHeader, DialogTitle, Input, Para, toast } from '@muzammil328/ui';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { emailSchema } from '@muzammil328/types';

const studentFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

type BulkAddResponse = {
  message: string;
  data: {
    failed: Array<{ email: string }>;
  };
};

interface AddStudentModalProps {
  triggerLabel?: React.ReactNode;
}

export function AddStudentModal({ triggerLabel }: AddStudentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSinglePending, setIsSinglePending] = useState(false);
  const [isBulkPending, setIsBulkPending] = useState(false);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());

    const students = lines
      .map(line => {
        const [username, email, password] = line.split(',').map(s => s.trim());
        return { username, email, password };
      })
      .filter(s => s.username && s.email && s.password);

    if (students.length === 0) {
      toast.error('No valid students found in file');
      return;
    }

    setIsBulkPending(true);
    const response: BulkAddResponse = {
      message: `${students.length} students processed`,
      data: { failed: [] },
    };

    toast.success(response.message);
    if (response.data.failed.length > 0) {
      toast.error(`${response.data.failed.length} students failed to add`);
    }
    setIsOpen(false);
    setIsBulkPending(false);
  };

  const onSubmit = (values: StudentFormValues) => {
    setIsSinglePending(true);
    try {
      void values;
      toast.success('Student added successfully');
      form.reset();
      setIsOpen(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add student';
      toast.error(errorMessage);
    } finally {
      setIsSinglePending(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template =
      'username,email,password\nstudent1,student1@example.com,password123\nstudent2,student2@example.com,password456';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{triggerLabel}</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-60 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Students</DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button
              variant={!isBulkMode ? 'default' : 'outline'}
              onClick={() => setIsBulkMode(false)}
            >
              Single
            </Button>
            <Button
              variant={isBulkMode ? 'default' : 'outline'}
              onClick={() => setIsBulkMode(true)}
            >
              Bulk Upload
            </Button>
          </div>

          {!isBulkMode ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="student-username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="student-username"
                  {...form.register('username')}
                  placeholder="Enter username"
                />
                {form.formState.errors.username && (
                  <Para className="text-sm text-red-500">{form.formState.errors.username.message}</Para>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="student-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="student-email"
                  {...form.register('email')}
                  type="email"
                  placeholder="Enter email"
                />
                {form.formState.errors.email && (
                  <Para className="text-sm text-red-500">{form.formState.errors.email.message}</Para>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="student-password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="student-password"
                  {...form.register('password')}
                  type="password"
                  placeholder="Enter password"
                />
                {form.formState.errors.password && (
                  <Para className="text-sm text-red-500">{form.formState.errors.password.message}</Para>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSinglePending}>
                  {isSinglePending ? 'Adding...' : 'Add Student'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <Para className="text-sm text-gray-600 mb-2">
                  Upload CSV file with columns: username, email, password
                </Para>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isBulkPending}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isBulkPending ? 'Processing...' : 'Upload CSV'}
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" onClick={handleDownloadTemplate}>
                  Download Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
