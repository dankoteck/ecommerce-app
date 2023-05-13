import { cache } from "react";
import { prisma } from "~/lib/prisma";

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

export default cache(getRelatedProducts);
