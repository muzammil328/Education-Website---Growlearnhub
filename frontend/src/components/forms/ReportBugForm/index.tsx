'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Bug, Link } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  url: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ReportBugForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

  const onSubmit = async () => {
    setMessage('');
    setIsError(false);

    try {
      // const response = await post<{ status: string; message: string }, FormValues>(
      //   '/api/bug-report',
      //   values
      // );
      // setMessage(response.message);
      // if (response.status === '200' || response.status === '201') {
      //   setIsError(false);
      //   form.reset({
      //     name: '',
      //     email: '',
      //     subject: '',
      //     url: typeof window !== 'undefined' ? window.location.href : '',
      //     description: '',
      //   });
      // } else {
      //   setIsError(true);
      // }
    } catch {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <section>
      {variant !== 'drawer' && (
        <div className="mx-auto max-w-2xl text-center">
          <h2>
            Report a Bug
          </h2>
          <p className="sm">
            Help us improve by reporting any bugs you encounter.
          </p>
        </div>
      )}

      <Form {...form}>
        <form className={variant === 'drawer' ? 'mt-4' : 'mt-6'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2 flex flex-col gap-3">
              <FormString
                name="name"
                label="Name"
                placeholder="Enter your name"
                leftIcon={<User className="h-4 w-4" />}
                required
              />
              <FormString
                name="email"
                label="Email"
                placeholder="Enter your email"
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />
            <FormString
              name="subject"
              label="Subject"
              placeholder="Brief description of the bug"
              leftIcon={<Bug className="h-4 w-4" />}
              required
            />
            <FormString
              name="url"
              label="Page URL (where you found the bug)"
              placeholder="https://example.com/page"
              leftIcon={<Link className="h-4 w-4" />}
            />
            <FormTextarea
              name="description"
              label="Bug Description"
              placeholder="Describe the bug in detail. What happened? What did you expect to happen?"
              required
              rows={6}
            />
          </div>
          {message && (
            <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>
              {message}
            </span>
          )}

          <Button type="submit" loading={form.formState.isSubmitting} className="w-full">
            Submit Bug Report
          </Button>
        </form>
      </Form>
    </section>
  );
}
