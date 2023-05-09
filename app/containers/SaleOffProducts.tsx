import { Product } from "@prisma/client";
import Link from "next/link";

import { prisma } from "~/lib/prisma";
import ProductItem from "../components/ProductItem";

async function getSaleOffProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { discount: { gt: 0 } },
  });
  return products;
}

export default async function SaleOffProducts() {
  const products: Product[] = await getSaleOffProducts();

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Sale off products</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Sale off products</p>

          {/* CTA */}
          <Link href="/" className="text-sky-600">
            Shop the collection
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem item={product} key={product.id} bordered />
          ))}
        </div>
      </div>
    </div>
  );
}
