import { Prisma } from "@prisma/client";
import Link from "next/link";

import { prisma } from "~/lib/prisma";
import ListProducts from "./ListProducts";

async function getSuggestedProducts() {
  // TODO: replace with API calls to get list sections have suggested products
  return await prisma.section.findMany({
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          slug: true,
          imageSrc: true,
          imageAlt: true,
          description: true,
          rawPrice: true,
          discount: true,
          rating: true,
          price: true,
        },
      },
    },
    take: 7,
  });
}

export default async function SuggestedForYou() {
  const products: Prisma.PromiseReturnType<typeof getSuggestedProducts> =
    await getSuggestedProducts();

  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Suggested for you</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Suggested for you</p>

          {/* CTA */}
          <Link href="/" className="hidden sm:block text-sky-600">
            View all
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <ListProducts items={products} />

        <Link href="/" className="block pt-4 text-right sm:hidden text-sky-600">
          View all
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  );
}
