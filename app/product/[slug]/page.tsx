import getProductDetails from "~/app/actions/getProductDetails";
import { DangerBadge } from "~/app/components/Badges";
import ProductHighLight from "~/app/components/ProductHighlight";
import Rating from "~/app/components/Rating";
import SocialNetwork from "~/app/components/SocialNetwork";
import RelatedProducts from "~/app/containers/RelatedProducts";
import { prisma } from "~/lib/prisma";
import { getIdFromSlugify } from "~/utils";
import Gallery from "./Gallery";
import Tabs from "./Tabs";
import { returnsPromo, shippingPromo } from "~/data/promo";
import AddToCart from "./AddToCart";

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

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const productId = getIdFromSlugify(params.slug);
  const product = await getProductDetails(productId);
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

            <p className="mt-6 text-slate-500 line-clamp-[14]">{product?.description}</p>

            <AddToCart currentProduct={product} />
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
