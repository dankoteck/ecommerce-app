"use client";

import { Tab } from "@headlessui/react";
import {
  BookOpenIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { getClassNames } from "~/utils";
import FAQ from "./FAQ";
import License from "./License";
import { Review } from "@prisma/client";

// Dummy data for FAQs
const FAQs = [
  {
    q: "What's the difference between a hippo and a zippo?",
    a: "One is really heavy, and the other is a little lighter.",
  },
  {
    q: "Can I use the icons at different sizes?",
    a: "Yes. The icons are built using SVG, so they can be resized to any size without losing quality.",
  },
  {
    q: "What is the license for the icons?",
    a: "The icons are free for personal and commercial use. No attribution required.",
  },
  {
    q: "Do I have to add attribution to my projects?",
    a: "No. You are allowed to use these icons freely in your personal and professional work. If you enjoy the icon pack, feel free to tell others!",
  },
];

export default function Tabs({ reviews }: { reviews: Review[] | undefined }) {
  const tabs = [
    {
      id: "reviews",
      name: "Reviews",
      icon: <UserIcon />,
      // TODO: this section will do later because no user in database
      content: <h1>Not available right yet.</h1>,
    },
    {
      id: "faq",
      name: "FAQ",
      icon: <QuestionMarkCircleIcon />,
      content: <FAQ list={FAQs} />,
    },
    {
      id: "license",
      name: "License",
      icon: <BookOpenIcon />,
      // content: <License items={product} />,
      content: null,
    },
  ];

  return (
    <div className="max-w-2xl pt-16 mx-auto">
      <Tab.Group>
        <Tab.List className="flex w-full space-x-8 border-b border-b-slate-200">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                getClassNames(
                  "w-fit py-4 px-1 font-medium leading-5 text-blue-700",
                  "focus:outline-none text-left border-b-2 border-b-transparent",
                  selected
                    ? "!border-b-blue-500"
                    : "text-blue-100 hover:text-slate-500"
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="pt-10">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.id} className={"focus:outline-none "}>
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
