"use client";

import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import Textarea from "../components/Textarea";

const questions = [
  {
    label: "Because it has the problem",
    value: "problem",
    description: "Something is not working as expected.",
  },
  {
    label: "I don't like it",
    value: "dislike",
    description: "I just don't like it.",
  },
  {
    label: "I don't have money",
    value: "money",
    description: "I don't have money to pay for it.",
  },
  {
    label: "I don't need it anymore",
    value: "useless",
    description: "Maybe I'll need it later.",
  },
  {
    label: "Other",
    value: "other",
    description: "I have another reason.",
  },
];

export default function Canceled() {
  const [selected, setSelected] = useState(questions[0]);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (evt: React.FormEvent<HTMLFormElement>) => {
    // TODO: call apis feedback here
    evt.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thank you for your feedback!
          </h1>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to shopping
            </Link>
            <Link
              href="/support"
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="grid max-w-2xl px-4 py-16 mx-auto bg-white sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 place-items-center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Canceled Payment
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {
            "You've canceled the payment. Please let us know if you've any trouble with it."
          }
        </p>
        <div className="w-full px-4 py-16">
          <div className="w-full max-w-md mx-auto">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">
                Customer Feedback
              </RadioGroup.Label>
              <div className="space-y-2">
                {questions.map((question) => (
                  <RadioGroup.Option
                    key={question.value}
                    value={question}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500"
                          : ""
                      }
                        ${
                          checked
                            ? "bg-indigo-600 bg-opacity-75 text-white"
                            : "bg-white"
                        }
                          relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start">
                          <RadioGroup.Label
                            as="p"
                            className={`text-sm font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {question.label}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-slate-100" : "text-gray-500"
                            }`}
                          >
                            <span>{question.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            {selected.value === "other" && (
              <div className="mt-8">
                <Textarea label="Feedback" onFinish={onFinish} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
