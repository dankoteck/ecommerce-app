import { Prisma } from "@prisma/client";

import { prisma } from "~/lib/prisma";
import { getIdFromSlugify } from "~/utils";
import { DangerBadge } from "~/app/components/Badges";
import SocialNetwork from "~/app/components/SocialNetwork";
import ProductHighLight from "~/app/components/ProductHighlight";
import Rating from "~/app/components/Rating";
import Gallery from "./Gallery";
import Tabs from "./Tabs";
import RelatedProducts from "~/app/containers/RelatedProducts";

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

async function getProduct(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        attributes: true,
        reviews: true,
        slug: true,
        gallery: true,
        imageAlt: true,
        imageSrc: true,
        name: true,
        rawPrice: true,
        price: true,
        id: true,
        discount: true,
        rating: true,
        isNowPromotion: true,
        featured: {
          select: {
            id: true,
          },
        },
        sections: {
          select: {
            id: true,
          },
        },
        description: true,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const shippingPromo = [
  {
    id: "free-shipping",
    name: "Free shipping ",
    value: "On orders over $300",
  },
  {
    id: "internal-shipping",
    name: "Internal shipping",
    value: "Available",
  },
  {
    id: "shipping-options",
    name: "Shipping options",
    value: "Expedited",
  },
  {
    id: "required-signatured",
    name: "Signature",
    value: "Required upon delivery",
  },
];

const returnsPromo = [
  {
    id: "easy-return",
    name: "Return requests",
    value: "Easy",
  },
  {
    id: "prepaid-shipping",
    name: "Pre-paid shipping label",
    value: "Included",
  },
  {
    id: "restocking-fee-for-returns",
    name: "Restocking fee for returns",
    value: "10%",
  },
  {
    id: "return-window",
    name: "Return window",
    value: "60 days",
  },
];

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const productId = getIdFromSlugify(params.slug);
  const product: Prisma.PromiseReturnType<typeof getProduct> = await getProduct(
    +productId
  );
  const gallery = product?.gallery.map((image, index) => ({
    id: index + 1,
    imageSrc: image,
    imageAlt: "Gallery image preview",
  }));

  return (
    <div className="max-w-2xl px-4 py-8 mx-auto border-t sm:px-6 sm:py-16 lg:max-w-7xl border-t-slate-200 lg:px-8">
      <div className="px-4 py-16 mx-auto lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10">
        <Gallery items={gallery} />

        {/* Product details */}
        <div className="pt-16 lg:pt-0 lg:col-span-3 lg:row-span-2 lg:row-end-2">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col">
              <div className="text-2xl font-medium line-clamp-2">
                {product?.name}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-2xl">
                  <p
                    className={`mr-4 ${
                      product && product.discount > 0 ? "line-through" : ""
                    }`}
                  >
                    ${product?.rawPrice}
                  </p>

                  {product && product.discount > 0 && (
                    <p className="flex items-center text-red-500">
                      <span>${product?.price}</span>
                      <DangerBadge>-{product?.discount}%</DangerBadge>
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-8">
                  ({product?.rating}) <Rating />
                </div>
              </div>
            </div>

            <p className="mt-6 text-slate-500">{product?.description}</p>

            <div className="grid grid-cols-1 gap-6 mt-10 gap-y-4">
              <button className="inline-block px-8 py-3 font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                Add to cart
              </button>
            </div>
          </div>

          {/* Product highlights & properties */}
          <div className="max-w-2xl pt-16 mx-auto">
            <h3 className="mb-6 font-medium">Product highlights</h3>

            <ProductHighLight
              title="Attributes"
              items={product?.attributes ?? []}
            />

            {/* This section will display when a product currently have promotion */}
            {!product?.isNowPromotion && (
              <ProductHighLight title="Shipping" items={shippingPromo} />
            )}

            {/* This section will display when a product have an featured */}
            {!product?.featured?.length && (
              <ProductHighLight title="Returns" items={returnsPromo} />
            )}
          </div>

          {/* Share */}
          <div className="max-w-2xl pt-16 mx-auto">
            <h3 className="font-medium">Share this product</h3>
            <SocialNetwork github twitter facebook />
          </div>
        </div>

        {/* Sections for Reviews/FAQ/License */}
        <div className="lg:col-span-4">
          <Tabs
            reviews={product?.reviews}
            //  faq={faqs}
            //  licenses={licenses}
          />
        </div>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <RelatedProducts productId={product?.id} sections={product?.sections} />
    </div>
  );
}
