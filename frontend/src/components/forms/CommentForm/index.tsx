'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Link, MessageSquare } from 'lucide-react';
import { request } from '@/lib/axios';

const schema = z.object({
  fname: z.string().min(1, 'First name is required'),
  lname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  url: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export default function CommentForm(props: { url: string }) {
  const [error, setError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      fname: '',
      lname: '',
      email: '',
      url: props.url,
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError('');
    try {
      const data = await request<{ status: string; message: string }>({
        url: '/api/comment',
        method: 'POST',
        data: values,
      });

      if (data.status === '400' || data.status === '500') {
        setError(data.message);
      } else {
        setError(data.message);
        form.reset({
          fname: '',
          lname: '',
          email: '',
          url: props.url,
          message: '',
        });
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred');
    }
  };

  return (
    <section className="relative my-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2>Comment Here</h2>
        <p>Plz comment below.</p>
      </div>

      <Form {...form}>
        <form className="mt-16 sm:mt-20" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            <FormString
              name="fname"
              label="First Name"
              placeholder="Enter First Name"
              leftIcon={<User className="h-4 w-4" />}
              required
            />
            <FormString
              name="lname"
              label="Last Name"
              placeholder="Enter Last Name"
              leftIcon={<User className="h-4 w-4" />}
              required
            />
            <div className="sm:col-span-2">
              <FormString
                name="email"
                label="Email"
                placeholder="Enter Email"
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <FormString
                name="url"
                label="Url"
                placeholder="Enter Url"
                leftIcon={<Link className="h-4 w-4" />}
              />
            </div>
            <div className="sm:col-span-2">
              <FormTextarea
                name="message"
                label="Message"
                placeholder="Enter your Message"
                required
                rows={4}
              />
            </div>
          </div>
          {error && <span className="text-emerald-500">{error}</span>}

          <Button type="submit" loading={form.formState.isSubmitting} variant="outline" className="w-full">
            Submit Here
          </Button>
        </form>
      </Form>
    </section>
  );
}
