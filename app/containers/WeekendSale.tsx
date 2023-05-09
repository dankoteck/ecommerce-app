import { prisma } from "~/lib/prisma";
import { Product, Section } from "@prisma/client";
import Link from "next/link";
import ProductSlider from "./ProductsSlider";
import Image from "next/image";

async function getWeekendSales(): Promise<{
  products: Product[];
  sections: Section[];
}> {
  // TODO: replace with API get list weekend sale
  const sections = await prisma.section.findMany({
    where: {
      slug: {
        startsWith: "women",
      },
    },
    take: 3,
  });

  const products = await prisma.product.findMany({
    where: {
      discount: { gt: 0 },
      sections: {
        every: {
          slug: {
            startsWith: "men",
          },
        },
      },
    },
  });

  return { products, sections };
}

export default async function WeekendSale() {
  const { products, sections } = await getWeekendSales();

  return (
    <section
      aria-labelledby="weekend-sale-products"
      className="bg-slate-50 border-y border-y-slate-200"
    >
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Weekend Sale</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Weekend Sale</p>

          {/* CTA */}
          <Link href="/" className="text-sky-600">
            Hot Deal right here
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        {/* Weekend sale sections */}
        <div className="grid grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/section/${section.slug}`}
              className={`cursor-pointer h-fit row-span-1 col-span-1 relative rounded-lg overflow-hidden group`}
            >
              <div className="relative aspect-h-1 aspect-w-2">
                <Image
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={section.imageSrc ?? ""}
                  alt={section.imageAlt ?? ""}
                  className="object-cover object-center w-full h-full group-hover:opacity-75"
                />
              </div>
            </Link>
          ))}
        </div>

        <ProductSlider showProductRating={false} items={products} />
      </div>
    </section>
  );
}
