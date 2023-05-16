"use client";

import { Squares2X2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { SectionPage } from "~/app/actions/getSectionPage";

import ProductItem from "~/app/components/ProductItem";
import Spinner from "~/app/components/Spinner";
import MenuDropdown from "~/app/components/MenuDropdown";
import { options as productSorterOptions } from "~/data/sorter";

type Item = {
  id: number;
  label: string;
  value: string | number;
};

export default function Products({
  section,
  filters,
}: {
  section: SectionPage;
  filters: Item[];
}) {
  const [filtering, setFiltering] = useState(false);
  const [list, setList] = useState(section?.products ?? []);
  const [loading, setLoading] = useState(false);

  const getGroupedFilters = (filters: Item[]) => {
    const data: {
      [key: string]: Item[];
    } = {};

    filters.forEach((filter: Item) => {
      const { id, label, value } = filter;
      if (!data[label]) {
        data[label] = [];
      }
      data[label].push({
        id,
        label: value + "",
        value: id,
      });
    });

    return data;
  };

  const groupedFilters = getGroupedFilters(filters);

  const onSorting = async (indexes: number[]) => {
    const param = productSorterOptions[indexes[0]].value;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/section/${section.id}${param}`
      );
      const data = await response.json();
      if (data) {
        const { products } = data;
        setList(products);
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const onFiltering = async (indexes: number[], key: string) => {
    setLoading(true);
    setFiltering(true);
    try {
      const params = indexes.map((index) => groupedFilters[key][index].value);
      const response = await fetch(
        `http://localhost:3000/api/section/${section.id}?attributes=${params}`
      );
      const data = await response.json();
      if (data) {
        const { products } = data;
        setList(products);
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const onClearAllFilter = () => {
    setLoading(false);
    setFiltering(false);
    setList(section.products);
  };

  return (
    <>
      <div className="pt-16 sm:pt-24">
        <div className="flex items-center justify-between pb-4 border-b border-b-slate-200">
          <h1 className="text-4xl font-bold">{section?.name}</h1>
          <div>
            <div className="flex items-center justify-between gap-4">
              <MenuDropdown
                bordered={false}
                onSelect={onSorting}
                options={productSorterOptions}
              >
                Sort by
              </MenuDropdown>
              <Squares2X2Icon className="w-7 h-7 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 pt-8">
        <div className="flex flex-wrap items-center gap-4 text-center">
          {Object.keys(groupedFilters).map((key) => (
            <MenuDropdown
              multiple
              key={key}
              onSelect={(indexes) => onFiltering(indexes, key)}
              options={groupedFilters[key]}
              defaultCheckedFirstValue={false}
              filtering={filtering}
            >
              {key}
            </MenuDropdown>
          ))}
          {filtering && (
            <>
              <span className="mx-2 text-slate-300">|</span>
              <button className="text-slate-500" onClick={onClearAllFilter}>
                Clear all
              </button>
            </>
          )}
        </div>

        {list.length > 0 && (
          <div className="flex justify-end w-full mb-8">
            <Link href="/" className="hidden sm:block text-sky-600">
              View all products
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        )}
        <Spinner spin={loading}>
          {list.length === 0 ? (
            <div className="text-center">No products found</div>
          ) : (
            <div className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((product) => (
                <ProductItem item={product} key={product.id} bordered />
              ))}
            </div>
          )}
        </Spinner>

        {list.length > 0 && (
          <Link
            href="/"
            className="block pt-4 text-right sm:hidden text-sky-600"
          >
            View all products
            <span aria-hidden="true"> →</span>
          </Link>
        )}
      </div>
    </>
  );
}
