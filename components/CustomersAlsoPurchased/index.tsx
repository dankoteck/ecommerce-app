import prisma from "~/lib/prisma";
import Slider from "./Slider";
import { Product } from "@prisma/client";
import Link from "next/link";

async function getProductSlides(): Promise<Product[]> {
  // TODO: replace with API get list products has most rating
  const products = await prisma.product.findMany({
    where: { discount: { equals: 0 } },
    take: 12,
  });
  return products;
}

export default async function CustomersAlsoPurchased() {
  const slides = await getProductSlides();

  return (
    <div className="max-w-2xl px-4 pb-16 mx-auto sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Customers also purchased</h2>
      <div className="flex items-center justify-between w-full mb-8">
        <p className="text-2xl">Customers also purchased</p>

        {/* CTA */}
        <Link href="/" className="text-sky-600">
          Explore more in collection
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <Slider items={slides} />
    </div>
  );
}
