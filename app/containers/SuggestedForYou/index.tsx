import { Prisma } from "@prisma/client";
import Link from "next/link";

import { prisma } from "~/lib/prisma";
import Products from "./Products";

async function getListSections() {
  // TODO: replace with API calls to get list sections have suggested products
  return await prisma.section.findMany({
    take: 7,
    include: {
      products: true,
    },
  });
}

export default async function SuggestedForYou() {
  const sections: Prisma.PromiseReturnType<typeof getListSections> =
    await getListSections();

  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Suggested for you</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Suggested for you</p>

          {/* CTA */}
          <Link href="/" className="text-sky-600">
            View all
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <Products items={sections} />
      </div>
    </div>
  );
}
