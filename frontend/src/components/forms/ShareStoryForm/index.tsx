'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea, Heading3 } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Trophy, Link } from 'lucide-react';
import { useCreateFeedback } from '@/hooks/use-feedback';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  achievement: z.string().min(1, 'Achievement is required'),
  url: z.string().optional(),
  story: z.string().min(1, 'Story is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ShareStoryForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const { mutate, isPending } = useCreateFeedback();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      achievement: '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      story: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setStatusMsg('');
    setIsError(false);
    const message = [
      `Achievement: ${values.achievement}`,
      values.url ? `URL: ${values.url}` : '',
      '',
      values.story,
    ].filter(Boolean).join('\n');

    mutate(
      { name: values.name, email: values.email, message, type: 'share-story' },
      {
        onSuccess: () => {
          setStatusMsg('Thank you for sharing your story! We will review it shortly.');
          form.reset({ name: '', email: '', achievement: '', url: typeof window !== 'undefined' ? window.location.href : '', story: '' });
        },
        onError: (err) => {
          setIsError(true);
          setStatusMsg(err.message || 'An error occurred. Please try again.');
        },
      }
    );
  };

  return (
    <section className={`relative ${variant === 'drawer' ? '' : 'my-20'}`}>
      {variant !== 'drawer' && (
        <div className="mx-auto max-w-2xl text-center">
          <Heading3>Share Your Success Story</Heading3>
          <span className="mt-3 text-center text-sm leading-7 text-gray-600 dark:text-white sm:text-base md:text-lg md:leading-8">
            Tell us how Growlearnhub helped you achieve academic success.
          </span>
        </div>
      )}
      <Form {...form}>
        <form className={variant === 'drawer' ? 'mt-4' : 'mt-16 sm:mt-20'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 gap-y-4">
            <FormString name="name" label="Name" placeholder="Enter your name" leftIcon={<User className="h-4 w-4" />} required />
            <FormString name="email" label="Email" placeholder="Enter your email" leftIcon={<Mail className="h-4 w-4" />} required />
            <FormString name="achievement" label="Achievement" placeholder="e.g., Scored 95% in Matric exams" leftIcon={<Trophy className="h-4 w-4" />} required />
            <FormString name="url" label="Page URL" placeholder="https://example.com/page" leftIcon={<Link className="h-4 w-4" />} />
            <FormTextarea name="story" label="Your Story" placeholder="Tell us your success story in detail..." required rows={6} />
          </div>
          {statusMsg && (
            <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>{statusMsg}</span>
          )}
          <Button type="submit" loading={isPending} className="w-full">
            Share Your Story
          </Button>
        </form>
      </Form>
    </section>
  );
}
