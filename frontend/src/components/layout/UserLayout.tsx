'use client';
import React from 'react';
import SubHeader from '@/components/layout/header/subheader/page';
import { Container } from '@muzammil328/ui';
import { ImageContainerLoading } from '../elements/ImageContainer';
import CommentForm from '@/components/forms/CommentForm';

export interface UserLayoutProps {
  title?: string;
  image?: string;
  canonical?: string;
  url?: string;
  children?: React.ReactNode;
}

export default function UserLayout({ title, image, url, canonical, children }: UserLayoutProps) {
  const resolvedTitle = title ?? '';
  const resolvedImage = image;
  const resolvedCanonical = canonical ?? '';
  const resolvedUrl = url ?? '';

  return (
    <main>
      <SubHeader title={resolvedTitle} />
      <section className="section">
        <div className="grid grid-cols-1 md:gap-6 lg:grid-cols-11">
          <div className="col-span-1 lg:col-span-8">
            {/* {resolvedImage && (
              <ImageContainerLoading
                image={resolvedImage}
                title={resolvedTitle}
                class="my-4 rounded-md"
                height={720}
                width={1280}
                priority
              />
            )} */}
            {children}
            {/* <CommentForm url={resolvedUrl || `https://growlearnhub.com${resolvedCanonical}`} /> */}
          </div>
          <aside className="col-span-1 lg:col-span-3">
            {/* <Sidebar title={data.title} url={data.url} /> */}
          </aside>
        </div>
      </section>
    </main>
  );
}
