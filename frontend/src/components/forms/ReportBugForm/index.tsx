'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea, Heading2, Para } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Bug, Link } from 'lucide-react';
import { useCreateFeedback } from '@/hooks/use-feedback';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  url: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ReportBugForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const { mutate, isPending } = useCreateFeedback();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      description: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setStatusMsg('');
    setIsError(false);
    const message = [
      `Subject: ${values.subject}`,
      values.url ? `URL: ${values.url}` : '',
      '',
      values.description,
    ].filter(Boolean).join('\n');

    mutate(
      { name: values.name, email: values.email, message, type: 'bug-report' },
      {
        onSuccess: () => {
          setStatusMsg('Bug report submitted successfully. Thank you!');
          form.reset({ name: '', email: '', subject: '', url: typeof window !== 'undefined' ? window.location.href : '', description: '' });
        },
        onError: (err) => {
          setIsError(true);
          setStatusMsg(err.message || 'An error occurred. Please try again.');
        },
      }
    );
  };

  return (
    <section>
      {variant !== 'drawer' && (
        <div className="mx-auto max-w-2xl text-center">
          <Heading2>Report a Bug</Heading2>
          <Para className="sm">Help us improve by reporting any bugs you encounter.</Para>
        </div>
      )}
      <Form {...form}>
        <form className={variant === 'drawer' ? 'mt-4' : 'mt-6'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2 flex flex-col gap-3">
            <FormString name="name" label="Name" placeholder="Enter your name" leftIcon={<User className="h-4 w-4" />} required />
            <FormString name="email" label="Email" placeholder="Enter your email" leftIcon={<Mail className="h-4 w-4" />} required />
            <FormString name="subject" label="Subject" placeholder="Brief description of the bug" leftIcon={<Bug className="h-4 w-4" />} required />
            <FormString name="url" label="Page URL (where you found the bug)" placeholder="https://example.com/page" leftIcon={<Link className="h-4 w-4" />} />
            <FormTextarea name="description" label="Bug Description" placeholder="Describe the bug in detail. What happened? What did you expect to happen?" required rows={6} />
          </div>
          {statusMsg && (
            <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>{statusMsg}</span>
          )}
          <Button type="submit" loading={isPending} className="w-full">
            Submit Bug Report
          </Button>
        </form>
      </Form>
    </section>
  );
}
