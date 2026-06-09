'use client';
import { useState } from 'react';
import { Button, Form, FormString, FormTextarea } from '@muzammil328/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Tag } from 'lucide-react';
import { useCreateFeedback } from '@/hooks/use-feedback';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [successMsg, setSuccessMsg] = useState('');
  const { mutate, isPending } = useCreateFeedback();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = (values: FormValues) => {
    setSuccessMsg('');
    mutate(
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: `Subject: ${values.subject}\n\n${values.message}`,
        type: 'contact',
      },
      {
        onSuccess: () => {
          setSuccessMsg('Your message has been sent successfully!');
          form.reset();
        },
        onError: (err) => {
          setSuccessMsg(err.message || 'An error occurred. Please try again.');
        },
      }
    );
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
        {successMsg && (
          <span className={`mb-4 block ${successMsg.includes('error') || successMsg.includes('error') ? 'text-red-500' : 'text-emerald-500'}`}>
            {successMsg}
          </span>
        )}
        <Button type="submit" loading={isPending} className="w-full">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
