'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Tag } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async () => {
    setMessage('');
    setIsError(false);

    try {
      // const response = await post<{ status: string; message: string }, FormValues>(
      //   '/api/contact',
      //   values
      // );
      // setMessage(response.message);
      // if (response.status === '200' || response.status === '201') {
      //   setIsError(false);
      //   form.reset({
      //     name: '',
      //     email: '',
      //     phone: '',
      //     subject: '',
      //     message: '',
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
    <Form {...form}>
      <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-2 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
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
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            leftIcon={<Phone className="h-4 w-4" />}
          />
          <FormString
            name="subject"
            label="Subject"
            placeholder="What is this about?"
            leftIcon={<Tag className="h-4 w-4" />}
            required
          />
          <div className="sm:col-span-2">
            <FormTextarea
              name="message"
              label="Message"
              placeholder="Write your message here..."
              required
              rows={6}
            />
          </div>
        </div>
        {message && (
          <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>
            {message}
          </span>
        )}

        <Button type="submit" loading={form.formState.isSubmitting} className="w-full">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
