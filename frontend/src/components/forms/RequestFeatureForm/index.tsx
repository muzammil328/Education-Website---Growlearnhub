'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lightbulb, Link } from 'lucide-react';
import { useCreateFeedback } from '@/hooks/use-feedback';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  featureTitle: z.string().min(1, 'Feature title is required'),
  url: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof schema>;

export default function RequestFeatureForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const { mutate, isPending } = useCreateFeedback();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      featureTitle: '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      description: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setStatusMsg('');
    setIsError(false);
    const message = [
      `Feature: ${values.featureTitle}`,
      values.url ? `URL: ${values.url}` : '',
      '',
      values.description,
    ].filter(Boolean).join('\n');

    mutate(
      { name: values.name, email: values.email, message, type: 'feature-request' },
      {
        onSuccess: () => {
          setStatusMsg('Feature request submitted! We appreciate your feedback.');
          form.reset({ name: '', email: '', featureTitle: '', url: typeof window !== 'undefined' ? window.location.href : '', description: '' });
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
          <h2>Request a Feature</h2>
          <p className="sm">Let us know what features you&apos;d like to see on Growlearnhub.</p>
        </div>
      )}
      <Form {...form}>
        <form className={variant === 'drawer' ? 'mt-4' : 'mt-6'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2 flex flex-col gap-3">
            <FormString name="name" label="Name" placeholder="Enter your name" leftIcon={<User className="h-4 w-4" />} required />
            <FormString name="email" label="Email" placeholder="Enter your email" leftIcon={<Mail className="h-4 w-4" />} required />
            <FormString name="featureTitle" label="Feature Title" placeholder="Brief title for the feature" leftIcon={<Lightbulb className="h-4 w-4" />} required />
            <FormString name="url" label="Page URL (where you'd like this feature)" placeholder="https://example.com/page" leftIcon={<Link className="h-4 w-4" />} />
            <FormTextarea name="description" label="Feature Description" placeholder="Describe the feature you'd like to see. How would it help you?" required rows={6} />
          </div>
          {statusMsg && (
            <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>{statusMsg}</span>
          )}
          <Button type="submit" loading={isPending} className="w-full">
            Submit Feature Request
          </Button>
        </form>
      </Form>
    </section>
  );
}
