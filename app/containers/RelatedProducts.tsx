import Link from "next/link";
import { prisma } from "~/lib/prisma";
import ProductItem from "../components/ProductItem";

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: {
        slug: true,
      },
    });

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getRelatedProducts(productId: number, sectionId: number) {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      where: {
        sections: {
          some: {
            id: {
              equals: sectionId,
            },
          },
        },
        AND: {
          id: {
            not: {
              equals: productId,
            },
          },
        },
      },
      select: {
        id: true,
        imageSrc: true,
        imageAlt: true,
        rawPrice: true,
        price: true,
        slug: true,
        discount: true,
        name: true,
        description: true,
        rating: true,
        gallery: true,
      },
    });

    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

type Props = {
  productId: number;
  sections:
    | {
        id: number;
      }[]
    | undefined;
};

export default async function RelatedProducts({ productId, sections }: Props) {
  const randomizeSection =
    sections?.[Math.floor(Math.random() * sections?.length)];
  const products = await getRelatedProducts(
    productId,
    randomizeSection?.id ?? 0
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Related products</h2>
        <div className="flex items-center justify-between w-full mb-8">
          <p className="text-2xl">Related products</p>

          {/* CTA */}
          <Link href="/" className="hidden sm:block text-sky-600">
            View all
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem item={product} key={product.id} bordered />
          ))}
        </div>

        <Link href="/" className="block pt-4 text-right sm:hidden text-sky-600">
          View all
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  );
}
