'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lightbulb, Link } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  featureTitle: z.string().min(1, 'Feature title is required'),
  url: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof schema>;

export default function RequestFeatureForm({ variant }: { variant?: 'page' | 'drawer' }) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: '',
      email: '',
      featureTitle: '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      description: '',
    },
  });

  const onSubmit = async () => {
    setMessage('');
    setIsError(false);

    try {
      // const response = await post<{ status: string; message: string }, FormValues>(
      //   '/api/feature-request',
      //   values
      // );
      // setMessage(response.message);
      // if (response.status === '200' || response.status === '201') {
      //   setIsError(false);
      //   form.reset({
      //     name: '',
      //     email: '',
      //     featureTitle: '',
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
            Request a Feature
          </h2>
          <p className="sm">
            Let us know what features you&apos;d like to see on Growlearnhub.
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
              name="featureTitle"
              label="Feature Title"
              placeholder="Brief title for the feature"
              leftIcon={<Lightbulb className="h-4 w-4" />}
              required
            />
            <FormString
              name="url"
              label="Page URL (where you&apos;d like this feature)"
              placeholder="https://example.com/page"
              leftIcon={<Link className="h-4 w-4" />}
            />
            <FormTextarea
              name="description"
              label="Feature Description"
              placeholder="Describe the feature you'd like to see. How would it help you?"
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
            Submit Feature Request
          </Button>
        </form>
      </Form>
    </section>
  );
}
