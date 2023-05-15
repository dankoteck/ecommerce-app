"use client";

import { Popover, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { getClassNames } from "~/utils";

type Item = {
  id: number;
  label: string;
  value: string | number;
};

export default function MenuDropdown({
  multiple,
  onSelect,
  options,
  children,
  defaultCheckedFirstValue = true,
  bordered = true,
}: {
  multiple?: boolean;
  onSelect: (params: number[]) => void;
  options: Item[];
  children: string;
  defaultCheckedFirstValue?: boolean;
  bordered?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(
    defaultCheckedFirstValue ? [0] : []
  );

  const handleSelect = (index: number) => {
    let newActiveIndex = [index];

    if (multiple) {
      if (activeIndex.includes(index)) {
        newActiveIndex = activeIndex.filter((i) => i !== index);
      } else {
        newActiveIndex = [...activeIndex, index];
      }
    }

    setActiveIndex(newActiveIndex);
    onSelect(newActiveIndex);
  };

  return (
    <Popover className="relative focus-visible:outline-0">
      <Popover.Button
        className={getClassNames(
          bordered ? "border border-indigo-600" : "",
          "inline-flex items-center px-2 py-1 text-sm leading-6 text-gray-900 rounded-md gap-x-1"
        )}
      >
        {children}{" "}
        {multiple
          ? activeIndex.length === 0
            ? ""
            : `(${activeIndex.length})`
          : options[activeIndex[0]].label}
        <ChevronDownIcon className="w-3 h-3 font-bold" aria-hidden="true" />
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
          <div className="flex-auto pr-8 overflow-hidden text-sm leading-6 bg-white rounded-md shadow-lg w-fit ring-1 ring-gray-900/5">
            <div className="p-1">
              {options.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(index)}
                  className={getClassNames(
                    activeIndex.includes(index)
                      ? "font-semibold text-black"
                      : "",
                    "relative flex p-2 gap-2 text-slate-500 rounded-md cursor-pointer group hover:bg-gray-50"
                  )}
                >
                  <span
                    className={getClassNames(
                      activeIndex.includes(index) ? "visible" : "invisible",
                      "inset-y-0 left-0 flex items-center font-semibold text-indigo-600"
                    )}
                  >
                    <CheckIcon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
