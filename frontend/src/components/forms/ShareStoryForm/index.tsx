'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Trophy, Link } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  achievement: z.string().min(1, 'Achievement is required'),
  url: z.string().optional(),
  story: z.string().min(1, 'Story is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ShareStoryForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

  const onSubmit = async () => {
    setMessage('');
    setIsError(false);
    setMessage('Thank you for sharing your story! We will review it shortly.');
  };

  return (
    <section className={`relative ${variant === 'drawer' ? '' : 'my-20'}`}>
      {variant !== 'drawer' && (
        <div className="mx-auto max-w-2xl text-center">
          <h3>Share Your Success Story</h3>
          <span className="mt-3 text-center text-sm leading-7 text-gray-600 dark:text-white sm:text-base md:text-lg md:leading-8">
            Tell us how Growlearnhub helped you achieve academic success.
          </span>
        </div>
      )}

      <Form {...form}>
        <form className={variant === 'drawer' ? 'mt-4' : 'mt-16 sm:mt-20'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 gap-y-4">
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
            name="achievement"
            label="Achievement"
            placeholder="e.g., Scored 95% in Matric exams"
            leftIcon={<Trophy className="h-4 w-4" />}
            required
          />
          <FormString
            name="url"
            label="Page URL"
            placeholder="https://example.com/page"
            leftIcon={<Link className="h-4 w-4" />}
          />
          <FormTextarea
            name="story"
            label="Your Story"
            placeholder="Tell us your success story in detail..."
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
          Share Your Story
        </Button>
      </form>
    </Form>
    </section >
  );
}
