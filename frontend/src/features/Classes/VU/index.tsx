'use client';
import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import CardSmall from '@/components/card/SmallCard';
import { useServiceByClassSlug } from '@/hooks/use-public';

export default function VU() {
  const { data: servicesData, isLoading, error } = useServiceByClassSlug('vu');
  const services = servicesData?.data ?? [];

  if (isLoading) return null;
  if (error) return null;

  return (
    <UserLayout
      title="Virtual University Study Resources | VU Tips & Exam Guides – GrowLearnHub"
      image="/vu.webp"
      canonical="/vu/"
      url="https://growlearnhub.com/vu/"
    >
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service: { name: string; slug: string }) => (
          <CardSmall key={service.slug} title={service.name} link={`vu/${service.slug}`} />
        ))}
      </div>
    </UserLayout>
  );
}