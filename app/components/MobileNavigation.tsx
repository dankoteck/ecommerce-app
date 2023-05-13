/*
  This example requires some changes to your config:
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

"use client";

import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getClassNames } from "~/utils";
import { getCategories } from "../actions";

export default function MobileNavigation({
  open,
  setOpen,
  categories,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: Prisma.PromiseReturnType<typeof getCategories>;
}) {
  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="flex px-4 -mb-px space-x-8">
                      {categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            getClassNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels as={Fragment}>
                    {categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="px-4 pt-10 pb-8 space-y-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {/* Featured */}
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="relative text-sm group"
                            >
                              <div className="bg-gray-100 relativeoverflow-hidden aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                <Image
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center rounded-lg"
                                />
                              </div>
                              <Link
                                href={`/featured/${item.slug}`}
                                className="block mt-6 font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>

                        {/* Sections */}
                        {category.sectionsGroup.map((group) => (
                          <div key={group.name}>
                            <p
                              id={`${group.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {group.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${group.id}-heading-mobile`}
                              className="flex flex-col mt-6 space-y-6"
                            >
                              {group.sections.map((section) => (
                                <li key={section.name} className="flow-root">
                                  <Link
                                    href={`/section/${section.slug}`}
                                    className="block p-2 -m-2 text-gray-500"
                                  >
                                    {section.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Pages */}
                {/* <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  {pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="block p-2 -m-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div> */}

                {/* Sign in btn */}
                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  <div className="flow-root">
                    <button
                      onClick={() => {}}
                      className="block p-2 -m-2 font-medium text-gray-900"
                    >
                      Sign in
                    </button>
                  </div>
                </div>

                {/* TODO: can replace with Signout btn when user is logging */}
                {/* <div className="px-4 py-6 border-t border-gray-200">
                  <a href="#" className="flex items-center p-2 -m-2">
                    <Image
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="flex-shrink-0 block w-5 h-auto"
                    />
                    <span className="block ml-3 text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
