'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormEmail, Form, Para, toast } from '@muzammil328/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormData = {
  email: string;
};

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required') // Ensure the email field is not empty
    .email('Invalid email format'), // Ensure the email is in a valid format
});



export default function Newsletter() {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    alert(data);
    setLoading(true);
    toast.loading('Subscribing you to the newsletter...');
    try {
      toast('You have successfully subscribed!');
      reset();
    } catch (error) {
      console.error(error);
      // Handle error if something goes wrong
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-1 w-full">
        <div className="flex w-full items-center">
          <FormEmail
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            hideLabel
            inputClassName="h-12 rounded-r-none"
          />

          <Button type="submit" className="h-12 rounded-l-none rounded-r-md" loading={loading}>
            Subscribe
          </Button>
        </div>
        {errors.email && <Para className="mt-2 text-sm text-red-500">{errors.email.message}</Para>}
      </form>
    </Form>
  );
}
