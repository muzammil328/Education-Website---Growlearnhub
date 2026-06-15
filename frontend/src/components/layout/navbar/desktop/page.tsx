import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { cn, Container } from '@muzammil328/ui';
import Logo from '@/components/elements/Logo';
import { navigation } from '@/components/layout/navbar/data';
import DesktopNavButtonGroup from './DesktopNavButtonGroup';
import Link from 'next/link';

export default function DesktopNavbar({ setOpen }: { setOpen: (value: boolean) => void }) {
  const [scrolling, setScrolling] = useState(false);
  const topNavLinkClass =
    'link1 relative z-10 -mb-px inline-flex h-9 items-center border-b border-transparent pb-0 text-sm font-medium transition-colors duration-200 ease-out';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'relative border-b border-border',
        scrolling &&
          'fixed left-0 top-0 z-40 w-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-colors duration-300 ease-in-out dark:bg-gray-950'
      )}
    >
      <Container className='py-4'>
        <div className="flex items-center justify-between">
          <Logo />

          {/* Flyout menus */}
          <Popover.Group className="ml-4 hidden h-full items-center space-x-8 md:flex">
            {navigation.pages.map((page: { name: string; href: string }) => (
              <Link
                key={page.name}
                title={page.name}
                href={page.href}
                className={topNavLinkClass}
              >
                {page.name}
              </Link>
            ))}
            {navigation.categories.map(
              (category: {
                name: string;
                sections: {
                  name: string;
                  items: { name: string; href: string }[];
                }[];
              }) => (
                <Popover
                  key={category.name}
                  className="flex"
                  // onBlur={() => {}} // Ensuring the popover closes on blur
                  as="div"
                >
                  {({ open, close }) => (
                    <React.Fragment>
                      <div className="relative flex">
                        <Popover.Button
                          className={cn(
                            `${topNavLinkClass} focus:outline-none focus-visible:outline-none`,
                            open ? 'border-border' : 'border-transparent'
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel
                          className="absolute inset-x-0 top-full z-50 border-t border-border bg-white/95 text-sm shadow-lg backdrop-blur dark:bg-stone-950/95"
                          onClick={e => e.stopPropagation()} // Prevents clicking inside the panel from closing the popover
                        >
                          <div
                            className="absolute inset-0 top-1/2 shadow"
                            aria-hidden="true"
                            onClick={close} // Close popover when overlay is clicked
                          />

                          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-8 gap-y-10 border-b px-8 py-8 text-sm lg:grid-cols-4">
                            {category.sections.map(
                              (section: {
                                name: string;
                                items: { name: string; href: string }[];
                              }) => (
                                <div key={section.name} className="min-w-0">
                                  <Para
                                    id={`${section.name}-heading`}
                                    className="flex items-center text-base font-semibold text-primary"
                                  >
                                    {section.name}
                                  </Para>
                                  <ul
                                    aria-labelledby={`${section.name}-heading`}
                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                  >
                                    {section.items.map((item: { name: string; href: string }) => (
                                      <li key={item.name} className="flex min-w-0">
                                        <Link
                                          href={item.href}
                                          className="link1"
                                          onClick={close}
                                          title={item.name}
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </React.Fragment>
                  )}
                </Popover>
              )
            )}
          </Popover.Group>

          <DesktopNavButtonGroup setOpen={setOpen} />
        </div>
      </Container>
    </nav>
  );
}
