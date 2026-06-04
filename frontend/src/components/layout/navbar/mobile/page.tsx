import { Fragment } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

import { Button } from '@muzammil328/ui';
import Logo from '@/components/elements/Logo';
import { navigation } from '@/components/layout/navbar/data';
import MobileNavButtonGroup from './MobileNavButtonGroup';
import Link from 'next/link';

export default function MobileNavbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-stone-950/25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto overflow-x-hidden bg-white pb-12 shadow-xl dark:bg-stone-950">
              <div className="absolute right-0 top-4 flex px-4 pb-2">
                <Button
                  size={'icon'}
                  variant={'destructive'}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md border-2 border-solid duration-300 ease-in"
                  onClick={() => setOpen(false)}
                >
                  <FaTimes />
                </Button>
              </div>

              <div className="fcc p-4">
                <Logo />
              </div>

              <div className="space-y-6 border-t px-4 py-6">
                {navigation.pages.map((page: { name: string; href: string }) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      href={page.href}
                      className="block border-b border-gray-300 py-3 text-sm font-medium"
                      onClick={() => setOpen(false)}
                      title={page.name}
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              <Tab.Group as="div" className="mt-2">
                <Tab.List className="-mb-px flex space-x-1 overflow-x-auto border-b px-4">
                  {navigation.categories.map(
                    (category: {
                      name: string;
                      sections: {
                        name: string;
                        items: { name: string; href: string }[];
                      }[];
                    }) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          `shrink-0 whitespace-nowrap border-b-2 px-6 py-4 text-base font-medium ${selected ? 'bg-destructive text-white' : 'bg-slate-100 dark:bg-gray-900'}`
                        }
                      >
                        {category.name}
                      </Tab>
                    )
                  )}
                </Tab.List>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map(
                    (category: {
                      id: string;
                      name: string;
                      sections: {
                        id: string;
                        name: string;
                        items: { name: string; href: string }[];
                      }[];
                    }) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-6">
                        {category.sections.map(
                          (section: {
                            id: string;
                            name: string;
                            items: { name: string; href: string }[];
                          }) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="flex items-center text-base font-semibold"
                              >
                                {section.name}
                              </p>
                              <ul
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item: { name: string; href: string }) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      href={item.href}
                                      className="-m-2 block border-b border-gray-300 p-2 text-sm font-medium"
                                      onClick={() => setOpen(false)}
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
                      </Tab.Panel>
                    )
                  )}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t px-4"></div>
              <MobileNavButtonGroup />
              <div className="border-t px-4 py-6"></div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
