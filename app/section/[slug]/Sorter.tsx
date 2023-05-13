"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

type Item = {
  id: number;
  label: string;
  value: any;
};

type Props = {
  children: string | React.ReactNode;
  items: Item[];
};

export default function Sorter({ children, items }: Props) {
  const handleClickItem = (value: any) => {
    
  };

  return (
    <Popover className="relative focus-visible:outline-0">
      <Popover.Button className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
        <span>{children}</span>
        <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-max">
          <div className="flex-auto w-48 overflow-hidden text-sm leading-6 bg-white rounded-lg shadow-lg ring-1 ring-gray-900/5">
            <div className="p-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClickItem(item.value)}
                  className="relative flex p-4 font-semibold text-gray-900 rounded-lg cursor-pointer group gap-x-6 hover:bg-gray-50"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
