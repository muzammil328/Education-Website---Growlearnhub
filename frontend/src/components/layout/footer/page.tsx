import React from 'react';
import dynamic from 'next/dynamic';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { config } from '@/config';
import { Heading4, Para } from '@muzammil328/ui';

const Logo = dynamic(() => import('@/components/elements/Logo'));

const userSupport = [
  { name: 'FAQs',               link: '/faqs/' },
  { name: 'Report a Bug',       link: '/report-a-bug/' },
  { name: 'Request a Feature',  link: '/request-feature/' },
  { name: 'User Experience',    link: '/user-experience/' },
  { name: 'Study Groups',       link: '/study-group/' },
  { name: 'Success Stories',    link: '/success-stories/' },
  { name: 'Contact Us',         link: '/contact-us/' },
];

const quickLinks = [
  { name: 'Home',             link: '/' },
  { name: 'Class 9',          link: '/class-9/' },
  { name: 'Class 10',         link: '/class-10/' },
  { name: 'Class 11',         link: '/class-11/' },
  { name: 'Class 12',         link: '/class-12/' },
  { name: 'VU',               link: '/vu/' },
  { name: 'Explore Topics',   link: '/explore-topics/' },
  { name: 'Jobs & Opportunities', link: '/jobs-opportunities/' },
  { name: 'Blogs',            link: '/blogs/' },
];

const privacy = [
  { name: 'About Us',           link: '/about-us/' },
  { name: 'Privacy Policy',     link: '/privacy-policy/' },
  { name: 'Terms & Conditions', link: '/terms-and-conditions/' },
  { name: 'Cookies Policy',     link: '/cookies-policy/' },
  { name: 'Disclaimer',         link: '/disclaimer/' },
];

const socials = [
  { icon: FaFacebook, href: 'https://facebook.com',  label: 'Facebook' },
  { icon: FaTwitter,  href: 'https://twitter.com',   label: 'Twitter' },
  { icon: FaInstagram,href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube,  href: 'https://youtube.com',   label: 'YouTube' },
];

function FooterCol({ title, links }: { title: string; links: { name: string; link: string }[] }) {
  return (
    <div>
      <Heading4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
        {title}
      </Heading4>
      <ul className="space-y-2.5">
        {links.map(item => (
          <li key={item.name}>
            <Link
              href={item.link}
              title={item.name}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-400 px-4 pt-12 sm:px-6 lg:px-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-4 gap-10">

          {/* col 1 — brand */}
          <div className="flex flex-col gap-5">
            <Logo />
            <Para className="text-base! text-muted-foreground">
              Pakistan&apos;s free study platform for Class 9, 10, 11, 12 and VU students.
              Notes, MCQs, tests, and past papers — all in one place.
            </Para>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-80"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* col 2 — user support */}
          <FooterCol title="User Support" links={userSupport} />

          {/* col 3 — quick links */}
          <FooterCol title="Quick Links" links={quickLinks} />

          {/* col 4 — privacy */}
          <FooterCol title="Privacy" links={privacy} />

        </div>

        {/* bottom bar */}
        <div className="mt-12 py-3 border-t border-border">
          <Para className='text-center'>
            © {new Date().getFullYear()}{' '}
            <span className="text-primary">{config.app.NAME}</span>. All rights reserved. Built by{' '}
            {/* <Link
              href="https://mmuzammil-portfolio.vercel.app/"
              title="Muzammil Safdar"
              className="font-medium text-primary hover:underline text-sm!"
            >
              Muzammil Safdar
            </Link> */}
            .
          </Para>
        </div>

      </div>
    </footer>
  );
}
