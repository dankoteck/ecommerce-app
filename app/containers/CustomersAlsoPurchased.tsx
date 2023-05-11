import { Prisma } from "@prisma/client";
import Link from "next/link";
import { prisma } from "~/lib/prisma";
import ProductsSlider from "./ProductsSlider";

async function getProducts() {
  // TODO: replace with API get list products has most rating
  const products = await prisma.product.findMany({
    where: { discount: { equals: 0 } },
    select: {
      id: true,
      slug: true,
      imageSrc: true,
      imageAlt: true,
      rating: true,
      name: true,
      description: true,
      discount: true,
      rawPrice: true,
      price: true,
    },
    take: 12,
  });

  return products;
}

export default async function CustomersAlsoPurchased() {
  const products: Prisma.PromiseReturnType<typeof getProducts> =
    await getProducts();

  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Customers also purchased</h2>
      <div className="flex items-center justify-between w-full mb-8">
        <p className="text-2xl">Customers also purchased</p>

        {/* CTA */}
        <Link href="/" className="hidden sm:block text-sky-600">
          Explore more in collection
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <ProductsSlider items={products} />

      <Link href="/" className="block pt-4 text-right sm:hidden text-sky-600">
        Explore more in collection
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
