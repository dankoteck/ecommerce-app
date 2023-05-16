"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { getClassNames } from "~/utils";

export default function AdvertisingBanner() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div
      className={getClassNames(
        showBanner ? "block" : "hidden",
        "relative isolate flex items-center gap-x-6 overflow-hidden bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">
          <strong className="font-semibold">Hot Deal</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Get free delivery on orders over $100
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Shopping now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex justify-end flex-1">
        <button
          onClick={() => setShowBanner(false)}
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="w-5 h-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
