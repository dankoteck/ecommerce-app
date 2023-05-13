import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getSuggestedProductsForCustomer() {
  // TODO: replace with API calls to get list sections have suggested products
  try {
    return await prisma.section.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageSrc: true,
            imageAlt: true,
            description: true,
            rawPrice: true,
            discount: true,
            rating: true,
            price: true,
          },
        },
      },
      take: 7,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getSuggestedProductsForCustomer);
