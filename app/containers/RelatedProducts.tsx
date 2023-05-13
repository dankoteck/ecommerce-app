import Link from "next/link";
import { getRelatedProducts } from "../actions";
import ProductItem from "../components/ProductItem";

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
