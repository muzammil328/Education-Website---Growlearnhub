'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Link } from 'lucide-react';
import { useCreateComment } from '@/hooks/use-comment';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  pageUrl: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export default function CommentForm(props: { url?: string }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const { mutate, isPending } = useCreateComment();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      pageUrl: props.url ?? (typeof window !== 'undefined' ? window.location.href : ''),
      message: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setStatusMsg('');
    setIsError(false);
    mutate(values, {
      onSuccess: () => {
        setStatusMsg('Comment submitted successfully!');
        form.reset({
          firstName: '',
          lastName: '',
          email: '',
          pageUrl: props.url ?? (typeof window !== 'undefined' ? window.location.href : ''),
          message: '',
        });
      },
      onError: (err) => {
        setIsError(true);
        setStatusMsg(err.message || 'An error occurred. Please try again.');
      },
    });
  };

  return (
    <section className="relative my-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2>Comment Here</h2>
        <p>Please leave a comment below.</p>
      </div>
      <Form {...form}>
        <form className="mt-16 sm:mt-20" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            <FormString name="firstName" label="First Name" placeholder="Enter First Name" leftIcon={<User className="h-4 w-4" />} required />
            <FormString name="lastName" label="Last Name" placeholder="Enter Last Name" leftIcon={<User className="h-4 w-4" />} required />
            <div className="sm:col-span-2">
              <FormString name="email" label="Email" placeholder="Enter Email" leftIcon={<Mail className="h-4 w-4" />} required />
            </div>
            <div className="sm:col-span-2">
              <FormString name="pageUrl" label="URL" placeholder="https://example.com/page" leftIcon={<Link className="h-4 w-4" />} />
            </div>
            <div className="sm:col-span-2">
              <FormTextarea name="message" label="Message" placeholder="Enter your message" required rows={4} />
            </div>
          </div>
          {statusMsg && (
            <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>{statusMsg}</span>
          )}
          <Button type="submit" loading={isPending} variant="outline" className="w-full">
            Submit Here
          </Button>
        </form>
      </Form>
    </section>
  );
}
