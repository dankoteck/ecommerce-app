"use client";

import { Tab } from "@headlessui/react";

import { getClassNames } from "~/utils";
import ProductItem from "../../components/ProductItem";
import { ProductInSection } from "~/types/product";

type Props = {
  items: ProductInSection[];
};

export default function ListProducts({ items }: Props) {
  return (
    <div className="px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex max-w-3xl p-1 ml-3 space-x-1 rounded-xl bg-blue-900/20">
          {items
            .filter((item) => item.products.length > 0)
            .map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  getClassNames(
                    "w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-blue-700",
                    "focus:outline-none ",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {item.name}
                <span className="bg-white ml-2 rounded-full inline-block text-slate-500 font-medium text-xs py-0.5 px-1.5">
                  {item.products.length}
                </span>
              </Tab>
            ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {/* List productts */}
          {items
            .filter((item) => item.products.length > 0)
            .map((item) => (
              <Tab.Panel
                key={item.id}
                className={getClassNames(
                  "rounded-xl bg-white p-3",
                  "focus:outline-none "
                )}
              >
                <div className="grid w-full grid-cols-1 border-t border-l sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {item.products.map((product) => (
                    <ProductItem
                      ratingAtTop
                      item={product}
                      key={product.id}
                      bordered
                    />
                  ))}
                </div>
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
