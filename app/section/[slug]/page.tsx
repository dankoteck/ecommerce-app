import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";

import { getAttributes, getSectionPage } from "~/app/actions";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import ProductItem from "~/app/components/ProductItem";
import Sorter from "~/app/section/[slug]/Sorter";
import { options as productSorterOptions } from "~/data/sorter";
import { getIdFromSlugify } from "~/utils";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const id = getIdFromSlugify(params.slug);
  const section = await getSectionPage(id);
  return { title: section?.name };
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const sectionId = getIdFromSlugify(params?.slug);
  const section = await getSectionPage(sectionId);
  const attributes = await getAttributes();
  const breadcrumbItems = [
    { title: "Home", path: "/" },
    { title: "Sections", path: "/sections" },
    { title: section?.name, path: `/section/${section?.slug}` },
  ];

  // const filters = attributes.map((attr) => ({
  //   id: attr.id,
  //   label: attr.name,
  // }));

  return (
    <div className="max-w-2xl px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8">
      <div className="py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="pt-16 sm:pt-24">
        <div className="flex items-center justify-between pb-8 border-b border-b-slate-200">
          <h1 className="text-4xl font-bold">{section?.name}</h1>
          <div>
            <div className="flex items-center justify-between gap-8">
              <Sorter items={productSorterOptions}>Sort</Sorter>
              <Squares2X2Icon className="w-7 h-7 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 pt-8">
        {/* Render filters here */}

        <div className="flex justify-end w-full mb-8">
          <Link href="/" className="hidden sm:block text-sky-600">
            View all products
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section?.products.map((product) => (
            <ProductItem item={product} key={product.id} bordered />
          ))}
        </div>

        <Link href="/" className="block pt-4 text-right sm:hidden text-sky-600">
          View all products
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  );
}
