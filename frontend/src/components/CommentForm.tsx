'use client';
import { useState } from 'react';
import { Textarea, Input, Label } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { request } from '@/lib/axios';
import { Heading3 } from '@muzammil328/ui';

export default function CommentForm(props: { url: string }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState('');
  const [commentForm, setCommentForm] = useState({
    fname: '',
    lname: '',
    email: '',
    url: props.url,
    message: '',
  });

  const SubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingBtn(false);
    try {
      setLoadingBtn(true);
      setError('');
      const data = await request<{ status: string; message: string }>({
        url: '/api/comment',
        method: 'POST',
        data: commentForm,
      });

      if (data.status === '400' || data.status === '500') {
        setError(data.message);
      } else {
        setError(data.message);
        setCommentForm({
          fname: '',
          lname: '',
          email: '',
          url: props.url,
          message: '',
        });
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    } finally {
      setLoadingBtn(false);
    }
  };
  return (
    <section className="relative my-20">
      <div className="mx-auto max-w-2xl text-center">
        <Heading3 tone="destructive" size="lg" align="center" weight="bold">
          Comment Here
        </Heading3>
        <span className="mt-3 text-center text-sm leading-7 text-gray-600 dark:text-white sm:text-base md:text-lg md:leading-8">
          Plz comment below.
        </span>
      </div>

      <form className="mt-16 sm:mt-20" onSubmit={SubmitHandle}>
        <div className="mb-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="fname">First Name:</Label>
            <div className="mt-2.5">
              <Input
                name="fname"
                type="text"
                value={commentForm.fname}
                placeholder="Enter First Name"
                onChange={e => setCommentForm({ ...commentForm, fname: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="lname">Last Name:</Label>

            <div className="mt-2.5">
              <Input
                name="lname"
                type="text"
                placeholder="Enter Last Name"
                value={commentForm.lname}
                onChange={e => setCommentForm({ ...commentForm, lname: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="emails">Email:</Label>

            <div className="mt-2.5">
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={commentForm.email}
                onChange={e => setCommentForm({ ...commentForm, email: e.target.value })}
                autoComplete="email"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="url">Url:</Label>

            <div className="mt-2.5">
              <Input
                name="url"
                type="url"
                placeholder="Enter Url"
                value={props.url}
                onChange={e => setCommentForm({ ...commentForm, url: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="message">Message:</Label>

            <div className="mt-2.5">
              <Textarea
                value={commentForm.message}
                name="message"
                placeholder="Enter your Message"
                onChange={e => setCommentForm({ ...commentForm, message: e.target.value })}
                rows={4}
                cols={50}
              />
            </div>
          </div>
        </div>
        {error && <span className="text-emerald-500">{error}</span>}

        <Button type="submit" loading={loadingBtn} variant="outline" className="w-full">
          Submit Here
        </Button>
      </form>
    </section>
  );
}
