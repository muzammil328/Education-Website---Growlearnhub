'use client';
import { useState } from 'react';
import { Textarea, Input, Label } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Heading3 } from '@muzammil328/ui';


interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactFormComponent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await post<{ status: string; message: string }, ContactForm>(
        '/api/contact',
        form
      );
      setMessage(response.message);
      if (response.status === '200' || response.status === '201') {
        setIsError(false);
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setIsError(true);
      }
    } catch {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative my-20">
      <div className="mx-auto max-w-2xl text-center">
        <Heading3 variant="destructive" size="xl" align="center" weight="bold">
          Get in Touch
        </Heading3>
        <span className="mt-3 text-center text-sm leading-7 text-gray-600 dark:text-white sm:text-base md:text-lg md:leading-8">
          Have questions? We&apos;d love to hear from you.
        </span>
      </div>

      <form className="mt-16 sm:mt-20" onSubmit={handleSubmit}>
        <div className="mb-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name:</Label>
            <div className="mt-2.5">
              <Input
                name="name"
                type="text"
                value={form.name}
                placeholder="Enter your name"
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <div className="mt-2.5">
              <Input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone:</Label>
            <div className="mt-2.5">
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                placeholder="Enter your phone number"
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject:</Label>
            <div className="mt-2.5">
              <Input
                name="subject"
                type="text"
                value={form.subject}
                placeholder="What is this about?"
                onChange={e => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message:</Label>
            <div className="mt-2.5">
              <Textarea
                value={form.message}
                name="message"
                placeholder="Write your message here..."
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={6}
                cols={50}
                required
              />
            </div>
          </div>
        </div>
        {message && (
          <span className={`mb-4 block ${isError ? 'text-red-500' : 'text-emerald-500'}`}>
            {message}
          </span>
        )}

        <Button type="submit" loading={loading} variant="outline" className="w-full">
          Send Message
        </Button>
      </form>
    </section>
  );
}
