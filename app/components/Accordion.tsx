"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string | React.ReactNode;
  children: string | React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-6 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
            {title}
            <ChevronUpIcon
              className={`${!open ? "rotate-180 transform" : ""} h-5 w-5`}
            />
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel static>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
