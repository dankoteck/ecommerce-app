"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { getClassNames } from "~/utils";

type Summary = {
  label: string;
  value: number;
  helperText?: string;
  primary?: boolean;
};

export default function OrderSummary({
  subtotal,
  cod,
  tax,
}: {
  subtotal?: number;
  cod?: number;
  tax?: number;
}) {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const orderSummary = [];
    if (subtotal) {
      orderSummary.push({
        label: "Subtotal",
        value: subtotal,
      });
    }

    if (cod) {
      orderSummary.push({
        label: "Shipping estimate",
        value: cod,
        helperText: "Learn more about how shipping is calculated.",
      });
    }

    if (tax) {
      orderSummary.push({
        label: "Tax estimate",
        value: tax,
        helperText: "Learn more about how tax is calculated.",
      });
    }

    orderSummary.push({
      label: "Order total",
      value: orderSummary.reduce((prev, curr) => prev + curr.value, 0),
      primary: true,
    });

    setSummary(orderSummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal, cod, tax]);

  return (
    <div className="pt-2">
      <h2 id="summary-heading" className="text-lg font-semibold">
        Order summary
      </h2>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <dl className="mt-4">
        {summary.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-3 border-b border-b-slate-200"
          >
            <dt
              className={getClassNames(
                item.primary ? "font-semibold" : "",
                "flex items-center text-sm gap-1"
              )}
            >
              <span>{item.label}</span>
              <span className="sr-only">{item.helperText}</span>
              {item.helperText && (
                <>
                  <Tooltip id={item.helperText} />
                  <QuestionMarkCircleIcon
                    data-tooltip-id={item.helperText}
                    data-tooltip-place="top"
                    data-tooltip-content={item.helperText}
                    className="w-5 h-5 text-gray-300 cursor-pointer hover:text-gray-600"
                  />
                </>
              )}
            </dt>
            <dd
              className={getClassNames(
                item.primary ? "font-semibold" : "",
                "text-sm font-medium text-black"
              )}
            >
              {Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(item.value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
