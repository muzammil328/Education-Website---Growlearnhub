import React from 'react';
import dynamic from 'next/dynamic';
import Newsletter from './newsletter';
import { Container } from '@muzammil328/ui';
import { Heading4 } from '@muzammil328/ui';
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
    <React.Fragment>
      <footer className="relative isolate overflow-hidden border-t border-border">
        <section className="bt">
          <Container>
            <div className="grid gap-8 py-8 sm:grid-cols-4 md:pt-24 md:grid-cols-6">
              <div className="col-span-2">
                <div className="my-5">
                  <Logo />
                </div>
                <p className="mb-6 text-base text-muted-foreground">
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
              <div className="col-span-2">
                <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                  Study Materials
                </Heading4>
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
              <div className="col-span-1">
                <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                  User Support
                </Heading4>
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
               <div className="col-span-1">
                 <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                   Classes
                </Heading4>
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
               <div className="col-span-1 lg:col-span-2">
                 <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                   Privacy
                </Heading4>
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
              <div className="col-span-1">
                <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                  Quick Link
                </Heading4>
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
               <div className="col-span-1">
                 <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                   Useful Link
                </Heading4>
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
               <div className="col-span-2">
                 <Heading4 className="mb-4 md:mb-6" weight="semibold" size="lg">
                   Get Contact
                </Heading4>
                <ul>
                  <li className="mb-3 flex gap-1 text-sm">
                    <strong>Phone:</strong>
                    <span>+923144878266</span>
                  </li>
                  <li className="mb-3 flex gap-1 text-sm">
                    <strong>Email:</strong>
                    <span>mmuzammiloff327@gmail.com</span>
                  </li>
                  <li className="mb-3 flex gap-1 text-sm">
                    <strong>Location:</strong>
                    <span>Lahore, Punjab, Pakistan</span>
                  </li>
                </ul>
                <Newsletter />
              </div>
            </div>
          </Container>
        </section>
        <section className="border-t border-border text-center py-4">
            <p className="text-sm text-muted-foreground">
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
    </React.Fragment>
  );
}
