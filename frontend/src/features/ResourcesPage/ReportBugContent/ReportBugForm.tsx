'use client';
import { useState } from 'react';
import { Textarea, Input, Label } from '@muzammil328/ui/forms';
import { Button } from '@muzammil328/ui';
import { Heading3 } from '@muzammil328/ui';


interface BugReportForm {
  name: string;
  email: string;
  subject: string;
  url: string;
  description: string;
}

export default function ReportBugForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState<BugReportForm>({
    name: '',
    email: '',
    subject: '',
    url: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await post<{ status: string; message: string }, BugReportForm>(
        '/api/bug-report',
        form
      );
      setMessage(response.message);
      if (response.status === '200' || response.status === '201') {
        setIsError(false);
        setForm({
          name: '',
          email: '',
          subject: '',
          url: '',
          description: '',
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
        <Heading3 tone="destructive" size="lg" align="center" weight="bold">
          Report a Bug
        </Heading3>
        <span className="mt-3 text-center text-sm leading-7 text-gray-600 dark:text-white sm:text-base md:text-lg md:leading-8">
          Help us improve by reporting any bugs you encounter.
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
          <div className="sm:col-span-2">
            <Label htmlFor="subject">Subject:</Label>
            <div className="mt-2.5">
              <Input
                name="subject"
                type="text"
                value={form.subject}
                placeholder="Brief description of the bug"
                onChange={e => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="url">Page URL (where you found the bug):</Label>
            <div className="mt-2.5">
              <Input
                name="url"
                type="url"
                value={form.url}
                placeholder="https://example.com/page"
                onChange={e => setForm({ ...form, url: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="description">Bug Description:</Label>
            <div className="mt-2.5">
              <Textarea
                value={form.description}
                name="description"
                placeholder="Describe the bug in detail. What happened? What did you expect to happen?"
                onChange={e => setForm({ ...form, description: e.target.value })}
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
          Submit Bug Report
        </Button>
      </form>
    </section>
  );
}
