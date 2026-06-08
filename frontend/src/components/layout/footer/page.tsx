import React from 'react';
import dynamic from 'next/dynamic';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { config } from '@/config';

const Logo = dynamic(() => import('@/components/elements/Logo'));

const UserSupport = [
  { name: 'Suggest a Quiz', link: '/dashboard/question/add/' },
  //   Quiz Wizard
  // Quiz Idea Box
  // Your Quiz Suggestions
  // Create a Challenge!
  // Quiz Proposals
  // Design a Quiz
  // Quiz Master Ideas
  // Brain Teaser Suggestion
  // What’s Your Quiz Idea?
  // Challenge Us! Suggest a Quiz
  { name: 'Request a Feature', link: '/request-feature/' },
  // Dream It, We’ll Build It
  // Your Ideas Matter
  // Suggest a Feature
  // Dream It, We’ll Build It
  // Inspire Us!
  // Innovation Station
  // Feature Request Hub
  // Your Suggestions, Our Solutions
  // Help Shape Our Future
  // Idea Exchange
  // Wish List
  { name: 'Report a Bug', link: '/report-a-bug/' },
  //   Bug Buster
  // Spot a Bug? Let Us Know!
  // Help Us Debug
  // Bug Report Hub
  // Glitch Alert
  // Report an Oops!
  // Found a Bug? Help Us Fix It!
  // Trouble Tracker
  // Issue Reporting Station
  // Notify Us of Bugs
  { name: 'User Experience', link: '/user-experience/' },
  { name: 'FAQs', link: '/faqs/' },
];

const UsefulLink = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/about-us/',
  },
  {
    name: 'Contact Us',
    link: '/contact-us/',
  },
  { name: 'Blogs', link: '/blogs/' },
];

const Privacy = [
  { name: 'Cookies Policy', link: '/cookies-policy/' },
  { name: 'Privacy Policy', link: '/privacy-policy/' },
  { name: 'Terms & Condition', link: '/terms-and-conditions/' },
  { name: 'Disclaimer', link: '/disclaimer/' },
];

const Classes = [
  { name: 'Class 9', link: '/class-9/' },
  { name: 'Class 10', link: '/class-10/' },
  { name: 'Class 11', link: '/class-11/' },
  { name: 'Class 12', link: '/class-12/' },
  { name: 'Virtual University', link: '/vu/' },
];

const StudyMaterials = [
  { name: 'Books', link: '/books/' },
  { name: 'Mcqs', link: '/mcqs/' },
  { name: 'Online Test', link: '/online-test/' },
  { name: 'Result', link: '/result/' },
  { name: 'Past Paper', link: '/past-paper/' },
  { name: 'Pairing Scheme', link: '/pairing-scheme/' },
  { name: 'Notes', link: '/notes/' },
  { name: 'Date Sheet', link: '/date-sheet/' },
];

const QuickLink = [
  {
    name: 'Jobs Opportunities',
    link: '/jobs-opportunities/',
  },
  {
    name: 'Explore Topics',
    link: '/explore-topics/',
  },
  {
    name: 'Study Groups',
    link: '/study-group/',
  },
  {
    name: 'Success Stories',
    link: '/success-stories/',
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      <div className="section grid gap-8 py-8 grid-cols-12">
        <div className="lg:col-span-5 sm:col-span-6 col-span-12">
          <Logo />
          <p className="mb-6 mt-2 text-muted-foreground">
            Stay in the loop with the latest news, and tips straight to your inbox! Don&apos;t
            miss out on valuable insights and exciting updates from us.
          </p>
          <div className="mb-6 flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank" title="Facebook" className="hover:opacity-80 transition-colors bg-primary h-10 w-10 flex items-center justify-center rounded-full text-white">
              <FaFacebook size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" title="Twitter" className="hover:opacity-80 transition-colors bg-primary h-10 w-10 flex items-center justify-center rounded-full text-white">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" title="Instagram" className="hover:opacity-80 transition-colors bg-primary h-10 w-10 flex items-center justify-center rounded-full text-white">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://youtube.com" target="_blank" title="YouTube" className="hover:opacity-80 transition-colors bg-primary h-10 w-10 flex items-center justify-center rounded-full text-white">
              <FaYoutube size={20} />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-4 xs:col-span-6 col-span-12">
          <h4>
            Study Materials
          </h4>
          <ul className="grid grid-cols-2 gap-1">
            {StudyMaterials.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1 text-sm">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 sm:col-span-4 col-span-6">
          <h4>
            User Support
          </h4>
          <ul>
            {UserSupport.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 xs:col-span-4 col-span-6">
          <h4>
            Classes
          </h4>
          <ul>
            {Classes.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 xs:col-span-4 col-span-6">
          <h4>
            Privacy
          </h4>
          <ul>
            {Privacy.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 sm:col-span-3 col-span-4">
          <h4>Quick Link</h4>
          <ul>
            {QuickLink.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3 sm:col-span-3 col-span-4">
          <h4>Useful Link</h4>
          <ul>
            {UsefulLink.map((item, index) => (
              <li className="mb-3" key={index}>
                <Link href={item.link} title={item.link} className="link1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="border-t border-border text-center md:p-2">
        <p className="sm">
          © {new Date().getFullYear()} <span className='text-primary'>{config.app.NAME}</span>. All rights reserved. Built by{' '}
          <Link
            href="https://mmuzammil-portfolio.vercel.app/"
            className="pl-1"
            title="Muzammil Safdar"
          >
            Muzammil Safdar.
          </Link>
        </p>
      </section>
    </footer>
  );
}
