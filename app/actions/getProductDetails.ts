import { Prisma } from "@prisma/client";
import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getProductDetails(id: number) {
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

export default cache(getProductDetails);

export type ProductDetails = Prisma.PromiseReturnType<typeof getProductDetails>;
